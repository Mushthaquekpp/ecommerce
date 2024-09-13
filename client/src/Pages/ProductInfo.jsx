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
              <Col md={3}>
                {/* <div style={{}}> */}
                <Card.Img
                  className="movie-details-img"
                  src={`http://localhost:8080/api/v1/product/photo/${productDetails._id}`}
                  alt={productDetails.name}
                />
                {/* </div> */}
                {/* </div> */}
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

      {/* Similar Products Section */}
      <div>
        <h1 className="text-center mt-5 mb-5">Similar Products</h1>
        {similarProducts.length < 1 && (
          <h4 className="text-center mt-4"> No Similar Products</h4>
        )}
        <Container>
          <Row className="d-flex justify-content-center">
            {similarProducts.map((item) => (
              <Col key={item._id} md={3}  xs={10} className="mb-4">
                <Card className="h-100 similar-product-card">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080/api/v1/product/photo/${item._id}`}
                    className="similar-product-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description.substring(0, 30)}...
                      <p style={{ fontSize: "16px" }}>Price: ₹{item.price}</p>
                    </Card.Text>
                    {/* Add to Cart Button for similar product */}
                    <Button
                      value="primary"
                      onClick={() => {
                        setCart([...cart, item]); // Add similar product to cart
                        toast.success("Item added to cart successfully");
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default ProductInfo;
