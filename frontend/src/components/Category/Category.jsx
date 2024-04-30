import "./category.css";
import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { axiosInstance, axiosInterceptorsInstance } from "../../axiosInstance";
import { AuthContext } from "/src/AuthContext";
import { dateOptions } from "/src/dateOptions.js";
import { timeOptions } from "/src/dateOptions.js";
import { Date } from "../../Date";

export const Category = ({ width }) => {
  const { emailCategory } = useParams();
  const [emailsData, setEmailsData] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const categorys = ["inbox", "sent", "archived"];

  if (!categorys.includes(emailCategory.toLowerCase().trim())) {
    navigate("/*");
    return;
  }

  useEffect(() => {
    const controller = new AbortController();

    const getEmailsFunction = async () => {
      const response = await axiosInterceptorsInstance.get(
        `/emails/c/${emailCategory}`,
        {
          signal: controller.signal,
        }
      );
      setEmailsData(response.data.emails);
    };

    getEmailsFunction();

    return () => {
      setEmailsData([]);
      controller.abort();
    };
  }, [emailCategory]);

  let substringConfige;

  if (width <= 850) {
    substringConfige = 10;
  }

  const handleEmailDelete = async (e, emailId) => {
    e.preventDefault();

    const response = await axiosInterceptorsInstance.delete(
      `/email/delete/${emailId}`
    );

    if (response.status === 200 && response.statusText === "OK") {
      const emailDelete = emailsData.filter((email) => email._id !== emailId);
      setEmailsData(emailDelete);
    }
  };

  return (
    <div className="category-container">
      <h2 className="category-title">{emailCategory}</h2>
      {emailsData.length === 0 ? (
        <p className="category-title">no {emailCategory}</p>
      ) : (
        <>
          {emailsData
            .slice()
            .reverse()
            .map((email) => {
              return (
                <div className="list-container" key={email._id}>
                  <Link
                    to={`/c/${emailCategory}/${email._id}`}
                    className="sents-list-container"
                  >
                    {emailCategory === "inbox" ||
                    emailCategory === "archived" ? (
                      <h3>{email.sender.email}</h3>
                    ) : (
                      <h3>{authState.user.email}</h3>
                    )}

                    {width <= 850 ? (
                      <p>{email.subject.substring(0, substringConfige)}...</p>
                    ) : (
                      <p>{email.subject}</p>
                    )}

                    <Date
                      dateOptions={dateOptions}
                      timeOptions={timeOptions}
                      createdAt={email}
                    />
                  </Link>

                  <button onClick={(e) => handleEmailDelete(e, email._id)}>
                    Delete
                  </button>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};
