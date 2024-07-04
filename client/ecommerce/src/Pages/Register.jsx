import React, { useState } from "react";
import "./Register.css";
import Layout from "../Components/Layout/Layout";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);
  const [phoneErr, setPhoneErr] = useState(null);
  const [addressErr, setAddressErr] = useState(null);
  const [answerErr, setAnswerErr] = useState(null);

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    setNameErr(null);
    setEmailErr(null);
    setConfirmPasswordErr(null);
    setPasswordErr(null);
    setPhoneErr(null);
    setAddressErr(null);
    setAnswerErr(null);

    let valid = true;
    if (!name) {
      setNameErr("Name required");
      valid = false;
    }
    if (!email) {
      setEmailErr("Email required");
      valid = false;
    }
    if (!password) {
      setPasswordErr("Password required");
      valid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordErr("Comfirm password required");
      valid = false;
    }
    if (password !== confirmPassword) {
      setPasswordErr("Password doesnt match");
      setConfirmPasswordErr("Password doesnt match");
      valid = false;
    }
    if (!address) {
      setAddressErr("Adress required");
      valid = false;
    }
    if (!phone) {
      setPhoneErr("Phone  required");
      valid = false;
    }
    if (!answer) {
      setAnswerErr("Answer  required");
      valid = false;
    }

    if (!valid) return;

    axios
      .post("http://localhost:8080/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Layout title={"Register"}>
      <form onSubmit={submit}>
        <div className="register-container">
          <div className="register-form">
            <div>
              <h1>Logo</h1>
            </div>
            <h3>Create your account</h3>
            <div className="input-group">
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameErr && <div className="form-error">{nameErr}</div>}
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

            <div className="input-group">
              <input
                className="form-input"
                name="confirmPassowrd"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordErr && (
                <div className="form-error">{confirmPasswordErr}</div>
              )}
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
              {phoneErr && <div className="form-error">{phoneErr}</div>}
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
              {addressErr && <div className="form-error">{addressErr}</div>}
            </div>

            <div className="input-group">
              <input
                className="form-input"
                name="answer"
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {answerErr && <div className="form-error">{answerErr}</div>}
            </div>

            <div>
              <button type="submit" className="form-btn">
                Signup
              </button>
              <div>
                Already have an account ?
                <b>
                  <Link to={"/login"}> Login</Link>
                </b>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
