import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/add-product",
        productData
      );
      if (data?.success) {
        toast.success("Product added successfully");

        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <Layout title={"Dashboard - Create - Product"}>
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <div>
              <AdminMenu />
            </div>
          </Col>
          <Col md="8">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                suffixIcon={null}
                bordered={false}
                placeholder="Select a category"
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-3 ">
              <label className="btn btn-outline-secondary">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            {photo && (
              <div className="mb-3 text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Product"
                  height={200}
                  className="img img-responsive"
                />
              </div>
            )}
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Enter product name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={description}
                placeholder="Enter product details"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-center">
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter product price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3 mx-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter product quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3 ">
                <Select
                  placeholder="Shipping"
                  bordered={false}
                  suffixIcon={null}
                  className="form-select "
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </div>
            </div>
            <div>
              <input
                type="submit"
                className="btn btn-primary"
                value="Create Product"
                onClick={handleProduct}
              />
            </div>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default CreateProduct;
