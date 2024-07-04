import React from "react";
import { useSearch } from "../Context/Search";
import { Card, Button } from "react-bootstrap";
import { Col, Row, Container } from "react-bootstrap";
import Layout from "../Components/Layout/Layout";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCart } from "../Context/Cart";

const SearchResult = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();

  return (
    <>
      <Layout>
        <Container>
          <Row>
            <h1 className="text-center">Search Result</h1>
            <h4 className="text-center">
              {values.results && values.results.length < 1
                ? "No Products Found"
                : `Results Found:${values.results.length}`}
            </h4>

            {values.results &&
              values.results.map((item) => (
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
                      <Link className="more-link" to={`/product/${item.slug}`}>
                        More Details
                      </Link>
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
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default SearchResult;
