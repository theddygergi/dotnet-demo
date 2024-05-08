import React from "react";
import LoginUser from "./LoginUser";
import LoginAdmin from "../../admin/auth/LoginAdmin";


function Login() {
  return (
    <div>
      <LoginUser />
      <hr />
      <LoginAdmin />
    </div>
  );
}

export default Login;
