import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you can send a request to your backend to handle the forgot password functionality
      // For demonstration purposes, let's just log the email
      console.log("Forgot Password Request for:", email);
      setMessage("Password reset instructions sent to your email.");
    } catch (error) {
      console.error("Error:", error.message);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="form">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <button className="formButton" type="submit">
          Reset Password
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
