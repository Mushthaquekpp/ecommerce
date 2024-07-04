import React from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Layout from "../../Components/Layout/Layout";

const User = () => {
  return (
    <div>
      <Layout>
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <div>
              <AdminMenu />
            </div>
          </Col>
          <Col md="8">
            <h1>User</h1>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default User;
