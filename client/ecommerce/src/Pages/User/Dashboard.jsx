import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import { useAuth } from "../../Context/Auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <div>
      <Layout>
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <UserMenu />
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

export default Dashboard;
