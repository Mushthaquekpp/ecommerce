import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [answerErr, setAnswerErr] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    setEmailErr(null);
    setPasswordErr(null);

    let valid = true;

    if (!email) {
      setEmailErr("Email required");
      valid = false;
    }
    if (!answer) {
      setAnswerErr(" Answer required");
      valid = false;
    }
    if (!newPassword) {
      setPasswordErr("New Password required");
      valid = false;
    }

    if (!valid) return;
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        {
          email,
          answer,
          newPassword,
        }
      );

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout title={"forgot - password"}>
        <form onSubmit={submit}>
          <div className="register-container">
            <div className="register-form">
              <div>
                <h1>Logo</h1>
              </div>
              <h3>Forgot Password</h3>

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
                  type="text"
                  name="answer"
                  placeholder="Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                {answerErr && <div className="form-error">{answerErr}</div>}
              </div>
              <div className="input-group">
                <input
                  className="form-input"
                  type="password"
                  name="newPassword"
                  placeholder="New-Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {passwordErr && <div className="form-error">{passwordErr}</div>}
              </div>

              <div>
                <button type="submit" className="form-btn">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default ForgotPassword;
