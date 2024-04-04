import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "/src/axiosInstance.js";
import { useState } from "react";
import { FinishRegistration } from "./components/FinishRegistration";

export const Register = () => {
  const [registrationSuccessfully, setRegistrationSuccessfully] =
    useState(false);
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const dataJson = Object.fromEntries(formdata.entries());

    const response = await axiosInstance.post("/users/create-user", dataJson);
    if (response.status === 200 && response.statusText === "OK") {
      setRegistrationSuccessfully(true);
      setTimeout(() => {
        navigate("/login");
        setRegistrationSuccessfully(false);
      }, 3150);
    }
  };

  return (
    <>
      {registrationSuccessfully ? (
        <FinishRegistration />
      ) : (
        <form onSubmit={createUser}>
          <label>
            Email
            <input className="email-input" type="email" name="email" />
          </label>

          <label>
            Password
            <input className="email-input" type="password" name="password" />
          </label>

          <label>
            Confirm password
            <input
              className="email-input"
              type="password"
              name="confirmPassword"
            />
          </label>

          <div className="login-link-container">
            <span className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </span>

            <button className="register-btn">Register</button>
          </div>
        </form>
      )}
    </>
  );
};
