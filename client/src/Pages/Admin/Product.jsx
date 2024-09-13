import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  console.log(products);
  return (
    <div>
      <Layout title={"Products"}>
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <div>
              <AdminMenu />
            </div>
          </Col>
          <Col md="8">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {products.map((item) => (
                <Link
                  key={item._id}
                  to={`/dashboard/admin/products/${item.slug}`}
                  className="product-link"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card
                    style={{ width: "18rem", margin: "10px", flex: "1 0 21%" }}
                  >
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8080/api/v1/product/photo/${item._id}`}
                      alt={item.name}
                    />
                    <Card.Body style={{ textAlign: "center" }}>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Text> price: {item.price} ₹</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Product;
