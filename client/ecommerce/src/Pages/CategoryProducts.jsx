import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { Card } from "react-bootstrap";

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    if (slug) getCategoryProduct();
  }, [slug]);

  const getCategoryProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="text-center">Category-{category.name}</h1>
        <h1 className="text-center">{products?.length}result found </h1>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((item) => (
          <Card style={{ width: "18rem", margin: "10px", flex: "1 0 21%" }}>
            <Card.Img
              variant="top"
              src={`http://localhost:8080/api/v1/product/photo/${item._id}`}
              alt={item.name}
            />
            <Card.Body style={{ textAlign: "center" }}>
              <Card.Title>{item.name}</Card.Title>

              <Card.Text> price: {item.price} ₹</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default CategoryProducts;
