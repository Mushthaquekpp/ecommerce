import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Layout from "../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";
import { prices } from "../Components/Prices";
import { useCart } from "../Context/Cart";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const [cart, setCart] = useCart();

  useEffect(() => {
    getTotal();
    getProduct();
    getCategory();
  }, []);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error(data?.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  const handleFilter = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    setChecked(updatedChecked);
  };

  const filterProducts = async () => {
    setLoading(true); // Set loading to true before making the request
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      if (data.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  useEffect(() => {
    filterProducts();
  }, [checked, radio]);

  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    getProduct();
  };

  return (
    <Layout title={"Ecommerce"}>
      <>
        {JSON.stringify(checked, null, 4)}
        <div className="page-title">
          <h1>All Products</h1>
        </div>

        <Row className="justify-content-md-center mt-5">
          <Col md="3">
            <div className="filter-section">
              <h4>Filter By Categories</h4>
              <Form>
                {categories.map((c) => (
                  <Form.Check
                    key={c._id}
                    type="checkbox"
                    label={c.name}
                    name="category"
                    value={c._id}
                    checked={!!checked.find((id) => id === c._id)}
                    className="custom-radio"
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  />
                ))}
              </Form>
              <h4>Filter By Price</h4>
              <Form>
                {prices.map((p) => (
                  <Form.Check
                    key={p._id}
                    type="radio"
                    label={p.name}
                    name="prices"
                    value={p.array} // Change this to value={p.array} to correctly set the price range
                    checked={radio.length && radio[0] === p.array[0]}
                    className="custom-radio"
                    onChange={(e) => setRadio(p.array)} // Update to setRadio(p.array) to correctly set the 'radio' state
                  />
                ))}
              </Form>
              <Button
                className="btn btn-primary my-3 mx-3"
                onClick={resetFilters}
              >
                Reset
              </Button>
            </div>
          </Col>
          <Col md="9">
            <div className="product-container">
              {products.map((item) => (
                <Card className="product-card" key={item.slug}>
                  <div className="image-container">
                    <Card.Img
                      src={`http://localhost:8080/api/v1/product/photo/${item._id}`}
                      alt={item.name}
                      className="product-image"
                    />
                  </div>

                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>price: {item.price} ₹</Card.Text>

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
              ))}
            </div>
            <div className="m-2 p-3 ">
              {products && products.length < total && (
                <Button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load more"}
                  {/* Display 'Loading...' when loading is true */}
                </Button>
              )}
              <h1>{total}</h1>
            </div>
          </Col>
        </Row>
      </>
    </Layout>
  );
};

export default Home;
