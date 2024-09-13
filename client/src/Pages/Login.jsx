import React, { useState } from "react";
import "./Register.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import Layout from "../Components/Layout/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const submit = async (e) => {
    e.preventDefault();

    setEmailErr(null);
    setPasswordErr(null);

    let valid = true;

    if (!email) {
      setEmailErr("Email required");
      valid = false;
    }
    if (!password) {
      setPasswordErr("Password required");
      valid = false;
    }

    if (!valid) return;
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });
      if ((res, res.data.success)) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Login"}>
      <form onSubmit={submit}>
        <div className="register-container">
          <div className="register-form">
            <div>
              <h1>Logo</h1>
            </div>
            <h3>Login your account</h3>

            <div className="input-group">
              <input
                className="form-input"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErr && <div className="form-error">{emailErr}</div>}
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
              {passwordErr && <div className="form-error">{passwordErr}</div>}
            </div>
            <div>
              <Link to={"/forgot-password"}>Forgot Password?</Link>
            </div>
            <div>
              <button type="submit" className="form-btn">
                Login
              </button>
              <div>
                Don't have an account ?
                <b>
                  <Link to={"/register"}>Register</Link>
                </b>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
