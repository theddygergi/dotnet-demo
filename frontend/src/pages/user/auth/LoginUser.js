import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { usersBaseUrl } from "../../../constants/url.constant";
import UserContext from "./UserContext";

function LoginUser() {
  const [wrong, setWrong] = useState(false);
  const [error, setError] = useState(false);
  const { userId, setUserId } = useContext(UserContext);
  const [data, setData] = useState({
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
      const res = await axios.post("https://localhost:7030/login", data);
      const res1 = await axios.post(
        "https://localhost:7030/api/User/login",
        data
      );
      setUserId(res1.data.id);
      const responseData = res.data; // Use a different variable name here
      console.log(res);
      if (res.status === 200) {
        console.log("Login successful");
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
          <h1>Log in as user</h1>
        </div>

        <div className="form">
          <form onSubmit={HandleLogin}>
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
              <button type="submit" className="Button" onClick={HandleLogin}>
                Login
              </button>
            </div>
          </form>
          <Link to="/forgotPassword">Forgot password?</Link>
          <button className="formButton" onClick={() => navigate("/register")}>
            Register
          </button>
          <button
            className="formButton"
            onClick={() => navigate("/loginAdmin")}
          >
            Login as Admin
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
export default LoginUser;
