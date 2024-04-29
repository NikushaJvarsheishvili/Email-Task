import "./compose.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { object, string } from "yup";
import { axiosInstance, axiosInterceptorsInstance } from "../../axiosInstance";

export const Compose = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const sentEmailFuntion = async (event, values) => {
    event.preventDefault();

    try {
      const response = await axiosInterceptorsInstance.post("/emails", values);

      if (response.statusText === "OK") {
        navigate(`/c/sent/${response.data.email._id}`);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const initialValues = {
    recipients: "",
    subject: "",
    body: "",
  };

  const validationSchema = object({
    recipients: string().required(),
    subject: string().required().min(3),
    body: string().required().min(3),
  });

  return (
    <div className="compose-container">
      <Formik
        initialValues={state || initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => sentEmailFuntion(event, values)}
        validateOnChange={false}
      >
        {(formik) => {
          console.log(formik);
          return (
            <Form>
              <label>
                Recipients
                <Field name="recipients" type="text" />
                <ErrorMessage
                  name="recipients"
                  component="span"
                  className={`error-message`}
                />
              </label>

              <label>
                Subject
                <Field
                  name="subject"
                  type="text"
                  
                />
                <ErrorMessage
                  name="subject"
                  component="span"
                  className="error-message"
                />
              </label>

              <label>
                Body
                <Field name="body" as="textarea" />
                <ErrorMessage
                  name="body"
                  component="span"
                  className="error-message"
                />
              </label>

              <div className="button-container">
                <button className="send-button" type="submit">
                  Send
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
