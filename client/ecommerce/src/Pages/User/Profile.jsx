import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UserMenu from "../../Components/Layout/UserMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setAddress(address);
    setEmail(email);
    setPhone(phone);
  }, [auth?.user]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/auth/profile",
        {
          name,
          password,
          phone,
          address,
        }
      );

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("profile updated successfully");
      }
    } catch (error) {
      toast.error("something went wrong");
      console.error(error);
    }
  };

  return (
    <div>
      <Layout>
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <UserMenu />
          </Col>
          <Col md="8">
            <form onSubmit={handleSubmit}>
              <div className="register-container">
                <div className="register-form">
                  <div>
                    <h1>Logo</h1>
                  </div>
                  <h3>Update your profile</h3>
                  <div className="input-group">
                    <input
                      className="form-input"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      className="form-input"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      className="form-input"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      className="form-input"
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      className="form-input"
                      name="address"
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div>
                    <button type="submit" className="form-btn">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Profile;
