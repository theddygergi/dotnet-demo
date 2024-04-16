import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { adminBaseUrl } from "../../constants/url.constant";
const RegisterAdmin = () => {
  const [User, setUser] = useState({
    Username: "",
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(adminBaseUrl + "createAdmin", User);
      navigate("/loginAdmin");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form">
      <h1>Register as admin</h1>
      <input
        type="email"
        placeholder="E-mail"
        onChange={handleChange}
        name="Email"
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handleChange}
        name="Password"
        className="input"
      />
      <button className="formButton" onClick={handleClick}>
        Register
      </button>
    </div>
  );
};

export default RegisterAdmin;
