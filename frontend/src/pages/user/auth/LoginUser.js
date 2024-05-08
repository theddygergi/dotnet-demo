import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { usersBaseUrl } from "../../../constants/url.constant";
import UserContext from "./UserContext";

function LoginUser() {
  const [error, setError] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [expiresIn, setExpiresIn] = useState(0);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:7030/login", data);
      const res1 = await axios.post("https://localhost:7030/api/User/login", data);
      setUserId(res1.data.id);
      sessionStorage.setItem('userId', res1.data.id); // Store user ID in sessionStorage
      const { accessToken,  expiresIn, refreshToken } = res.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setExpiresIn(expiresIn);
      if (res.status === 200) {
        console.log("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log("Login error", error);
      setError(true);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post("https://localhost:7030/refresh", {
        refreshToken,
      });
      const { accessToken, expiresIn } = res.data;
      setAccessToken(accessToken);
      setExpiresIn(expiresIn);
    } catch (error) {
      console.log("Token refresh error", error);
    }
  };

  useEffect(() => {
    let refreshTimer;
  
    if (expiresIn > 0) {
      refreshTimer = setInterval(() => {
        if (expiresIn < 60) {
          // Refresh token when it's close to expiration
          refreshAccessToken();
        }
      }, 1000 * (expiresIn - 60)); // Refresh 1 minute before expiration
    }
  
    return () => clearInterval(refreshTimer); // Clear the interval on unmount
  }, [expiresIn]);
  
  

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
              <button type="submit" className="Button">
                Login
              </button>
            </div>
          </form>
          <Link to="/forgotPassword">Forgot password?</Link>
          <button className="formButton" onClick={() => navigate("/register")}>
            Register
          </button>
          {error && (
            <div role="alert">
              <span className="font-medium">Login failed:</span> Wrong email or password.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginUser;
