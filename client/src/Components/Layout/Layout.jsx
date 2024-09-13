import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Helmet from "react-helmet";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
const Layout = ({ children, title, heading }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main
        style={{
          minHeight: "70vh",
          marginInline: "auto",
        }}
      >
        <Container fluid className="mx-auto">
          <Toaster />
          <h1 style={{}} className="m-3">
            {heading}
          </h1>
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "ecommerce",
};
export default Layout;
