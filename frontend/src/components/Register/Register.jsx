import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "/src/axiosInstance.js";
import { useState } from "react";
import { FinishRegistration } from "./components/FinishRegistration";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { object, string, ref } from "yup";

export const Register = () => {
  const [registrationSuccessfully, setRegistrationSuccessfully] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const createUser = async (event, values) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/user/register", values);
      if (response.status === 200) {
        setRegistrationSuccessfully(true);
        setTimeout(() => {
          navigate("/login");
          setRegistrationSuccessfully(false);
        }, 3150);
      }
    } catch (error) {
      console.log(error);
      if (
        error.response.status === 409 &&
        error.response.statusText === "Conflict"
      ) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = object({
    email: string()
      .required()
      .matches(/^\S+@\S+\.\S+$/),
    password: string().required().min(8),
    confirmPassword: string()
      .required()
      .oneOf([ref("password"), null], "Passwords must match"),
  });

  return (
    <div className="register-container">
      {registrationSuccessfully ? (
        <FinishRegistration />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => createUser(event, values)}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <>
                {errorMessage ? (
                  <div className="error-message-container">
                    <p>{errorMessage}</p>
                  </div>
                ) : null}
                <Form>
                  <label>
                    Email
                    <Field className="email-input" type="email" name="email" />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="error-message"
                    />
                  </label>

                  <label>
                    Password
                    <Field
                      className="email-input"
                      type="password"
                      name="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="error-message"
                    />
                  </label>

                  <label>
                    Confirm password
                    <Field
                      className="email-input"
                      type="password"
                      name="confirmPassword"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="span"
                      className="error-message"
                    />
                  </label>

                  <div className="login-link-container">
                    <span className="login-link">
                      Already have an account? <Link to="/login">Login</Link>
                    </span>

                    <button className="register-btn" type="submit">
                      Register
                    </button>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      )}
    </div>
  );
};
