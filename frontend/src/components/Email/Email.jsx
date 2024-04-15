import "./email.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosInstance";
import { dateOptions } from "/src/dateOptions.js";
import { timeOptions } from "/src/dateOptions.js";
import { Date } from "../../Date";

export const Email = () => {
  const { emailId, emailCategory } = useParams();

  const [emailById, setEmailById] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const emailFindByIdFunction = async () => {
      setIsLoading(true);
      const response = await axiosInstance.get(`/emails/${emailId}`, {
        signal,
      });
      setEmailById(response.data.email);
      setIsLoading(false);
    };

    emailFindByIdFunction();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <div className="email-container">
          <Link to={`/c/${emailCategory}`}>Back</Link>
          <h1>{emailById.subject || emailById.subject}</h1>
          <p className="category-name">{emailCategory}</p>

          <h2>
            From:
            <span> {emailById.sender.email && emailById.sender.email}</span>
          </h2>
          <h2>
            To:
            <span> {emailById.recipients[0] || emailById.recipients[0]}</span>
          </h2>
          <Date
            dateOptions={dateOptions}
            timeOptions={timeOptions}
            createdAt={emailById}
          />
        </div>
      )}
    </>
  );
};
