// Importing necessary libraries and components
import React, { useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import "./Header.css";
import { useCart } from "../../Context/Cart";
import { Link } from "react-router-dom";
import SearchInput from "../Form/SearchInput";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
  // Accessing and updating authentication state from the Auth context
  const [auth, setAuth] = useAuth();
  // State for storing categories fetched from the API
  const [categories, setCategories] = useState([]);
  // Accessing cart state from the Cart context
  const [cart] = useCart();

  // Function to handle user logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
    });
    localStorage.removeItem("token");
  };

  // Function to fetch categories from the API
  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      // Setting fetched categories to the state
      setCategories(response.data.category);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to fetch categories when the component mounts
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="navbar p-md-3">
        <Container className="nav-container container mx-auto d-flex align-items-center position-relative">
          {/* Navbar brand linking to the home page */}
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            ECOMM
          </Navbar.Brand>
          {/* SearchInput component displayed only on larger screens */}
          <div className="hide-on-small">
            <SearchInput />
          </div>
          {/* Cart icon displayed only on smaller screens */}
          <div className="hide-on-large">
            <Nav.Link as={Link} to="/cart">
              <div className="d-flex align-items-center cart-count">
                <AiOutlineShoppingCart size={26} />
                <sup className="cart-count-count">{cart?.length}</sup>
              </div>
            </Nav.Link>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav justify className="custom-nav">
              {/* Navigation links */}
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              {/* Dropdown for category navigation */}
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <Nav.Link as={Link} to="/all-categories">
                  <li>All Category</li>
                </Nav.Link>

                {/* Dynamically generated category items */}
                {categories.map((category) => (
                  <NavDropdown.Item
                    key={category._id}
                    href={`/categories/${category.slug}`}
                  >
                    {category.name.toLowerCase()}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              {/* Conditional rendering based on user authentication */}
              {!auth.user ? (
                <>
                  <Nav.Link as={Link} to="/register">
                    Signup
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown
                    title={auth.user?.name.toLowerCase()}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {/* Cart icon displayed only on larger screens */}
          <div className="hide-on-small">
            <Nav.Link as={Link} to="/cart">
              <div className="d-flex align-items-center cart-count">
                <AiOutlineShoppingCart size={26} />
                <sup className="cart-count-count">{cart?.length}</sup>
              </div>
            </Nav.Link>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
