import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { axiosInstance } from "/src/axiosInstance.js";
import { AuthContext } from "/src/AuthContext";

export const Login = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginFunction = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const dataJson = Object.fromEntries(formdata.entries());

    const response = await axiosInstance.post("/user/login", dataJson);

    if (response.statusText === "OK") {
      navigate("/c/inbox");
      setAuthState({
        ...authState,
        user: response.data.user,
      });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={loginFunction}>
        <label>
          Email
          <input name="email" className="email-input" type="email" id="email" />
        </label>

        <label>
          Password
          <input
            name="password"
            className="password-input"
            type="password"
            id="password"
          />
        </label>

        <div className="account-register-link-container">
          <span className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </span>

          <button className="login-btn">Login</button>
        </div>
      </form>
    </div>
  );
};
