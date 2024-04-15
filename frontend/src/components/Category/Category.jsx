import "./category.css";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";
import { AuthContext } from "/src/AuthContext";
import { dateOptions } from "/src/dateOptions.js";
import { timeOptions } from "/src/dateOptions.js";
import { Date } from "../../Date";

export const Category = () => {
  const { emailCategory } = useParams();
  const [emailsData, setEmailsData] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const controller = new AbortController();

    const getEmailsFunction = async () => {
      const response = await axiosInstance.get(`/emails/c/${emailCategory}`, {
        signal: controller.signal,
      });
      setEmailsData(response.data.emails);
    };

    getEmailsFunction();

    return () => {
      setEmailsData([]);
      controller.abort();
    };
  }, [emailCategory]);

  return (
    <div className="category-container">
      <h2>{emailCategory}</h2>
      {emailsData
        .slice()
        .reverse()
        .map((email) => {
          return (
            <Link
              to={`/c/${emailCategory}/${email._id}`}
              key={email._id}
              className="sents-list-container"
            >
              <h3>{authState.user.email}</h3>

              <p>{email.subject}</p>
              <Date
                dateOptions={dateOptions}
                timeOptions={timeOptions}
                createdAt={email}
              />
            </Link>
          );
        })}
    </div>
  );
};
