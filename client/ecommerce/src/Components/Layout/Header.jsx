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
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
    });
    localStorage.removeItem("token");
  };

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      setCategories(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Navbar expand="lg" className="navbar">
      <Container className="nav-container container-fluid">
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          ECOMMERCE APP
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" ms-auto">
            <Nav.Link as={Link} to="/">
              HOME
            </Nav.Link>
            <SearchInput />

            <NavDropdown title="CATEGORIES" id="basic-nav-dropdown">
              <Nav.Link as={Link} to="/all-categories">
                <li>All Category</li>
              </Nav.Link>

              {categories.map((category) => (
                <NavDropdown.Item
                  key={category._id}
                  href={`/categories/${category.slug}`}
                >
                  {category.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {!auth.user ? (
              <>
                <Nav.Link as={Link} to="/register">
                  REGISTER
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  LOGIN
                </Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown
                  title={auth.user?.name.toUpperCase()}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    as={Link}
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    DASHBOARD
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
              </>
            )}

            <Nav.Link as={Link} to="/cart">
              CART({cart?.length})
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
