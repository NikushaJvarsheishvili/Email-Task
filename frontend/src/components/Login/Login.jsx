import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <form>
        <label>
          Email
          <input className="email-input" type="email" id="email" />
        </label>

        <label>
          Password
          <input className="password-input" type="password" id="password" />
        </label>

        <div className="account-register-link-container">
          <span className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </span>

          <button className="login-btn">Login</button>
        </div>
      </form>
    </>
  );
};
