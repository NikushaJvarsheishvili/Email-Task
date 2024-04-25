import "./category.css";
import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { axiosInstance, axiosInterceptorsInstance } from "../../axiosInstance";
import { AuthContext } from "/src/AuthContext";
import { dateOptions } from "/src/dateOptions.js";
import { timeOptions } from "/src/dateOptions.js";
import { Date } from "../../Date";
import { EmailCategoryTitle } from "/src/EmailCategoryTitle";

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
      console.log(response.data);
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

  return (
    <div className="category-container">
      <h2>
        <EmailCategoryTitle emailCategory={emailCategory} />
      </h2>
      {emailsData.length === 0 ? (
        <p>
          No <EmailCategoryTitle emailCategory={emailCategory} />
        </p>
      ) : (
        <>
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
                  {emailCategory === "inbox" || emailCategory === "archived" ? (
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
              );
            })}
        </>
      )}
    </div>
  );
};
