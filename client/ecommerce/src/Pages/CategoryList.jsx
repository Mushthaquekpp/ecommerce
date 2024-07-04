import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../Components/Layout/Layout";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

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
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <Layout>
      <div>
        <h1 style={{ textAlign: "center" }} className="m-3">
          All Categories
        </h1>
        {categories.map((item) => (
          <Link
            key={item._id}
            to={`/categories/${item.slug}`}
            className="btn btn-primary m-2"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default CategoryList;
