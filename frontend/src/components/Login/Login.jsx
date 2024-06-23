import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  axiosInstance,
  axiosInterceptorsInstance,
  setCsrfToken,
} from "/src/axiosInstance.js";
import { AuthContext } from "/src/AuthContext";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { object, string, ref } from "yup";

export const Login = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginFunction = async (event, values) => {
    event.preventDefault();

    const response = await axiosInstance.post("/user/login", values);

    if (response.statusText === "OK") {
      setCsrfToken(axiosInstance, response.headers["x-csrf-token"]);
      setCsrfToken(axiosInterceptorsInstance, response.headers["x-csrf-token"]);
      // navigate("/c/inbox");
      window.location.href = "/c/index";
      setAuthState({
        ...authState,
        user: response.data.user,
      });
    }
  };

  const validationSchema = object({
    email: string()
      .required()
      .matches(/^\S+@\S+\.\S+$/, "email is not a valid"),
    password: string().required().min(8),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="login-container">
      <Formik
        onSubmit={(values) => loginFunction(event, values)}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(formik) => {
          return (
            <Form noValidate>
              <label>
                Email
                <Field
                  name="email"
                  className="email-input"
                  type="email"
                  id="email"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="error-message"
                />
              </label>

              <label>
                Password
                <Field
                  name="password"
                  className="password-input"
                  type="password"
                  id="password"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error-message"
                />
              </label>

              <div className="account-register-link-container">
                <span className="register-link">
                  Don't have an account? <Link to="/register">Register</Link>
                </span>

                <button className="login-btn">Login</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
