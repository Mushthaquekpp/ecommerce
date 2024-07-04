import React from "react";
import Layout from "../Components/Layout/Layout";
import "./Contact.css";
import { IoMailOutline, IoCallOutline } from "react-icons/io5";
import { FiHeadphones } from "react-icons/fi";
const Contact = () => {
  return (
    <Layout  title={"Contact Us"}>
      <div className="hero ">
        <div className="container  ">
          <div className="hero-content">
            <h1>Contact Us</h1>
          </div>
        </div>
      </div>
      <div className="contents">
        <span>CONTACT WITH US!</span>
        <div className="content-details">
          For any inquiries or information regarding our product, please feel
          free to reach out to us at any time. Our dedicated team is available
          24/7 to assist you. Don't hesitate to contact us; we're here to help!
        </div>
        <div>
          <div className="contact">
            <div className="mt-2">
              <IoMailOutline /> : www.help@ecommerceapp.com
            </div>
            <div className="mt-2">
              <IoCallOutline /> : 012-3456789
            </div>
            <div className="mt-2">
              <FiHeadphones /> : 1800-0000-0000
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
