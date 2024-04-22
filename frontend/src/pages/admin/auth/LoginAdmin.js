import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { adminBaseUrl } from "../../../constants/url.constant";
import Swal from "sweetalert2";
import { Balcony } from "@mui/icons-material";

function LoginAdmin() {
  const [wrong, setWrong] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  const navigate = useNavigate();
  const HandleLogin = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const res = await axios.post(adminBaseUrl + "loginAdmin", data);
      const responseData = res.data; // Use a different variable name here
      console.log(res);
      if (res.status === 200) {
        console.log("Login successful");
        setTimeout(
          Swal.fire({
            icon: "success",
            title: "Admin added successfully",
            color: Balcony,
          }),
          500000
        );
        navigate("/");
      } //else console.log("Login failed", responseData.error);
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <>
      <div>
        <div>
          <h1>Log in as admin</h1>
        </div>

        <div className="form">
          <form onSubmit={HandleLogin}>
            <div>
              <label htmlFor="username">Username</label>
              <div>
                <input
                  className="inputRegister"
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <div>
                <input
                  className="inputRegister"
                  id="email"
                  name="email"
                  type="text"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div>
                <input
                  className="inputRegister"
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button type="submit" className="Button">
                Login
              </button>
            </div>
          </form>
          <p>Forgot password?</p>
          <button
            className="formButton"
            onClick={() => navigate("/registerAdmin")}
          >
            Add admin
          </button>
          {wrong && (
            <div>
              <span>Wrong Email or Password</span> ,try submitting again.
            </div>
          )}
          {error && (
            <div role="alert">
              <span class="font-medium">Server error</span> ,try submitting
              again.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default LoginAdmin;
