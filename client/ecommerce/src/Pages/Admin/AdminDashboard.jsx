import React from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useAuth } from "../../Context/Auth";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Layout from "../../Components/Layout/Layout";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <div>
      <Layout>
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <AdminMenu />
          </Col>
          <Col md="8">
            <div>
              <h4>Name : {auth?.user?.name}</h4>
              <h4>Email : {auth?.user?.email}</h4>
              <h4>Phone : {auth?.user?.phone}</h4>
            </div>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
