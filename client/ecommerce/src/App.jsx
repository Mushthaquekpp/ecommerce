import React from "react";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageNotFound from "./Pages/PageNotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import Dashboard from "./Pages/User/Dashboard";
import Profile from "./Pages/User/Profile";
import Orders from "./Pages/User/Orders";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import AdminRoute from "./Components/Routes/AdminRoute";
import User from "./Pages/Admin/User";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Product from "./Pages/Admin/Product";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import ProductInfo from "./Pages/ProductInfo";
import CategoryList from "./Pages/CategoryList";
import CategoryProducts from "./Pages/CategoryProducts";
import Cart from "./Pages/Cart";
import SearchResult from "./Pages/SearchResult";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/product/:slug" element={<ProductInfo />} />
          <Route path="/all-categories" element={<CategoryList />} />
          <Route path="/categories/:slug" element={<CategoryProducts />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<Orders />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/users" element={<User />} />
            <Route path="admin/createcategory" element={<CreateCategory />} />
            <Route path="admin/createproduct" element={<CreateProduct />} />
            <Route path="admin/products" element={<Product />} />
            <Route path="admin/products/:slug" element={<UpdateProduct />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
