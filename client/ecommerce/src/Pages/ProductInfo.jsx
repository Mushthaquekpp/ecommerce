import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Layout from "../Components/Layout/Layout";
import "./ProductInfo.css";
import { useCart } from "../Context/Cart";

const ProductInfo = () => {
  const [productDetails, setProductDetails] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [cart, setCart] = useCart();

  const { slug } = useParams();

  const getOneProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${slug}`
      );
      setProductDetails(data?.products);
      relatedProducts(data?.products._id, data?.products.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const relatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setSimilarProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOneProduct();
  }, [slug]);

  return (
    <Layout>
      <div>
        <Container>
          <Card className="movie-details-card mt-5">
            <Row>
              <Col md={6}>
                <Card.Img
                  className="movie-details-img"
                  src={`http://localhost:8080/api/v1/product/photo/${productDetails._id}`}
                  alt={productDetails.name}
                />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>{productDetails.name}</Card.Title>
                  <Card.Text>{productDetails.description}</Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> {productDetails.price} ₹
                  </Card.Text>
                  <Card.Text>
                    <strong>Category:</strong> {productDetails.category?.name}
                  </Card.Text>
                  <Button
                    value="primary"
                    className="mx-2"
                    onClick={() => {
                      setCart([...cart, productDetails]);
                      toast.success("item added to cart successfully");
                    }}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>

      <div>
        <h1 className="text-center mt-5">Similar Products</h1>
        {similarProducts.length < 1 && (
          <h4 className="text-center mt-4"> No Similar Products</h4>
        )}
        {similarProducts.map((item) => (
          <div key={item._id} className="mb-4">
            <Card>
              <Card.Body className="d-flex">
                <div style={{ flex: "1" }}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080/api/v1/product/photo/${item._id}`}
                    className="card-details-img"
                  />
                </div>
                <div style={{ flex: "2", marginLeft: "50px" }}>
                  <div>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description.substring(0, 30)}.....
                    </Card.Text>
                    <Card.Text>{item.price}</Card.Text>
                  </div>
                  <div>
                    <Button
                      value="primary"
                      className="mx-2"
                      onClick={() => {
                        setCart([...cart, item]);
                        toast.success("item added to cart successfully");
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductInfo;
