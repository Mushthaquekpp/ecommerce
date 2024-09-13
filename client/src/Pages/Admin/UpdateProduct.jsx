// import React, { useEffect, useState } from "react";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/Button";
// import AdminMenu from "../../Components/Layout/AdminMenu";
// import Layout from "../../Components/Layout/Layout";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Select } from "antd";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateProduct = () => {
//   const { Option } = Select;

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   console.log("the name is", name);
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [shipping, setShipping] = useState("");
//   const [photo, setPhoto] = useState(null);

//   const navigate = useNavigate();
//   const { slug } = useParams();

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const productData = new FormData();
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("category", category);
//       productData.append("quantity", quantity);
//       productData.append("shipping", shipping);
//       if (photo) {
//         productData.append("photo", photo);
//       }

//       const { data } = await axios.put(
//         `http://localhost:8080/api/v1/product/edit-product/${products._id}`,
//         productData,
//         { headers: { "Content-Type": "multipart/form-data" } } // Set content type for FormData
//       );
//       if (data?.success) {
//         toast.success(data.message);
//         navigate(`/dashboard/admin/products/${slug}`);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating product");
//     }
//   };

//   const getOneProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:8080/api/v1/product/single-product/${slug}`
//       );

//       if (data?.success) {
//         setProducts(data.products);
//         setName(data.products.name);
//         setDescription(data.products.description);
//         setQuantity(data.products.quantity);
//         setCategory(data.products.category);
//         setShipping(data.products.shipping);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error while fetching product details");
//     }
//   };
//   const deleteProduct = async () => {
//     try {
//       const { data } = await axios.delete(
//         `http://localhost:8080/api/v1/product/delete-product/${products._id}`
//       );
//       if (data?.success) {
//         toast.success("product deleted successfully");
//         navigate("/dashboard/admin/products");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong");
//     }
//   };

//   const getCategory = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:8080/api/v1/category/get-category"
//       );
//       if (data?.success) {
//         setCategories(data?.category);
//       } else {
//         toast.error(data?.message || "Failed to fetch categories");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong while getting categories");
//     }
//   };

//   useEffect(() => {
//     getCategory();
//     getOneProduct();
//   }, []);

//   return (
//     <div>
//       <Layout title={"Dashboard - Update - Product"}>
//         <Row className="justify-content-md-center mt-5">
//           <Col md="4">
//             <div>
//               <AdminMenu />
//             </div>
//           </Col>
//           <Col md="8">
//             <h1>Update Product</h1>
//             <div className="m-1 w-75">
//               <Select
//                 suffixIcon={null}
//                 bordered={false}
//                 placeholder="Select a category"
//                 size="large"
//                 className="form-select mb-3"
//                 onChange={(value) => setCategory(value)}
//                 value={category}
//               >
//                 {categories.map((item) => (
//                   <Option key={item._id} value={item._id}>
//                     {item.name}
//                   </Option>
//                 ))}
//               </Select>
//             </div>
//             <div className="mb-3 ">
//               <label className="btn btn-outline-secondary">
//                 {photo ? photo.name : "Upload photo"}
//                 <input
//                   type="file"
//                   name="photo"
//                   accept="image/*"
//                   onChange={(e) => setPhoto(e.target.files[0])}
//                   hidden
//                 />
//               </label>
//             </div>
//             {photo && (
//               <div className="mb-3 text-center">
//                 <img
//                   src={URL.createObjectURL(photo)}
//                   alt="Product"
//                   height={200}
//                   className="img img-responsive"
//                 />
//               </div>
//             )}
//             <div className="mb-3">
//               <input
//                 type="text"
//                 value={name}
//                 placeholder="Enter product name"
//                 className="form-control"
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 value={description}
//                 placeholder="Enter product details"
//                 className="form-control"
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>
//             <div className="d-flex align-items-center">
//               <div className="mb-3">
//                 <input
//                   type="number"
//                   value={price}
//                   placeholder="Enter product price"
//                   className="form-control"
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3 mx-3">
//                 <input
//                   type="number"
//                   value={quantity}
//                   placeholder="Enter product quantity"
//                   className="form-control"
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3 ">
//                 <Select
//                   placeholder="Shipping"
//                   bordered={false}
//                   suffixIcon={null}
//                   className="form-select "
//                   onChange={(value) => setShipping(value)}
//                 >
//                   <Option value="yes">Yes</Option>
//                   <Option value="no">No</Option>
//                 </Select>
//               </div>
//             </div>
//             <div>
//               <input
//                 type="submit"
//                 className="btn btn-primary"
//                 value="Update Product"
//                 onClick={handleUpdate}
//               />
//               <Button className="btn btn-danger mx-3" onClick={deleteProduct}>
//                 Delete
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </Layout>
//     </div>
//   );
// };

// export default UpdateProduct;

import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { Option } = Select;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();
  const { slug } = useParams();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      if (photo) {
        productData.append("photo", photo);
      }

      const { data } = await axios.put(
        ` http://localhost:8080/api/v1/product/edit-product/${products._id}`,
        productData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data?.success) {
        toast.success(data.message);
        navigate(`/dashboard/admin/products/${slug}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating product");
    }
  };

  const getOneProduct = async () => {
    try {
      const { data } = await axios.get(
        ` http://localhost:8080/api/v1/product/single-product/${slug}`
      );
      if (data?.success) {
        setProducts(data.products);
        setName(data.products.name);
        setDescription(data.products.description);
        setQuantity(data.products.quantity);
        setCategory(data.products.category);
        setShipping(data.products.shipping);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching product details");
    }
  };
  const deleteProduct = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${products._id}`
      );
      if (data?.success) {
        toast.success("product deleted successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
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
    getOneProduct();
  }, []);

  return (
    <div>
      <Layout title={"Dashboard - Update - Product"}>
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <div>
              <AdminMenu />
            </div>
          </Col>
          <Col md="8">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                suffixIcon={null}
                bordered={false}
                placeholder="Select a category"
                size="large"
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
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
                value="Update Product"
                onClick={handleUpdate}
              />
              <Button className="btn btn-danger mx-3" onClick={deleteProduct}>
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default UpdateProduct;
