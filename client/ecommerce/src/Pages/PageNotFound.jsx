import React from "react";
import Layout from "../Components/Layout/Layout";
import "./PageNotFound.css";
const PageNotFound = () => {
  return (
    <Layout>
      <div className="not-found-container">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for might be in another castle.</p>
      </div>
    </Layout>
  );
};

export default PageNotFound;
