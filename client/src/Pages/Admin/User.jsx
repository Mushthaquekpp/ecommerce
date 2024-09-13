import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/admin/users"
      );
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/admin/users/${userId}`);
      toast.success("User deleted successfully");
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  // Search function
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Layout>
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <AdminMenu />
          </Col>
          <Col md="8">
            <h1>Manage Users</h1>
            <FormControl
              type="text"
              placeholder="Search users by name or email"
              className="mb-3"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() =>
                          navigate(`/admin/users/edit/${user._id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default User;
