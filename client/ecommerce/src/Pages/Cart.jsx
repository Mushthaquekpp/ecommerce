import React, { useState, useEffect } from "react";
import { useCart } from "../Context/Cart";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";

import { Card, Button, Container, Row, Col } from "react-bootstrap";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleRemove = (id) => {
    const newCart = cart.filter((item) => item._id !== id);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  const handlePayment = async () => {
    if (!instance) {
      console.error("Braintree instance not available");
      return;
    }
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      setCart([]);
      localStorage.removeItem("cart");
      toast.success("payment successfull");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("payment failed");
    }
  };
  return (
    <>
      <Layout>
        <Container>
          <Row>
            <h1 className="text-center">{auth?.token && auth?.user?.name}</h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart?.length} items in your Cart ${
                    auth?.token ? "" : "Please Login to checkout!"
                  }`
                : "Your cart is empty!"}
            </h4>
            {cart.length > 0 && (
              <h3 className="text-center">Total Price: {totalPrice} ₹</h3>
            )}

            {cart.map((item) => (
              <Col key={item._id} md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080/api/v1/product/photo/${item._id}`}
                    alt={item.name}
                  />
                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description.substring(0, 30)}.....
                    </Card.Text>
                    <Card.Text> price: {item.price} ₹</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <div className="mt-2">
              {clientToken && (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <Button
                    variant="primary"
                    onClick={handlePayment}
                    disabled={loading || instance || !auth.user?.address}
                  >
                    {loading ? "processing..." : "Make Repayment"}
                  </Button>
                </>
              )}
            </div>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default Cart;
