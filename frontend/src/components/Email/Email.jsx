import "./email.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { axiosInstance, axiosInterceptorsInstance } from "../../axiosInstance";
import { dateOptions } from "/src/dateOptions.js";
import { timeOptions } from "/src/dateOptions.js";
import { Date } from "../../Date";

export const Email = () => {
  const [emailById, setEmailById] = useState(null);
  const { emailId, emailCategory } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const emailFindByIdFunction = async () => {
      setIsLoading(true);

      const response = await axiosInterceptorsInstance.get(
        `/emails/${emailId}`,
        {
          signal,
        }
      );

      setIsLoading(false);
      setEmailById(response.data.email);
    };

    emailFindByIdFunction();

    return () => {
      controller.abort();
    };
  }, []);

  const archiveEmailFunction = async (e) => {
    e.preventDefault();

    const response = await axiosInterceptorsInstance.patch(
      `/emails/${emailId}`,
      {
        archived: !emailById.archived,
      }
    );
    setEmailById(response.data.email);

    if (response.statusText === "OK" && response.data.email.archived) {
      navigate(`/c/archived/${emailId}`);
      console.log("this is true");
    } else if (response.statusText === "OK" && !response.data.email.archived) {
      navigate(`/c/inbox/${emailId}`);
    }
  };

  const day = new window.Date(
    isLoading ? null : emailById.createdAt
  ).toLocaleDateString("en-US", dateOptions);

  const time = new window.Date(
    isLoading ? null : emailById.createdAt
  ).toLocaleTimeString("en-US", timeOptions);

  console.log(day, time);
  const replyFunction = (e) => {
    e.preventDefault();

    navigate("/compose", {
      state: {
        recipients: emailById.recipients.toString(),
        subject: `Re: ${emailById.subject}`,
        body: `\n\n\n\n---\nOn ${day} ${time}, ${emailById.sender.email} wrote:\n\n${emailById.body}`,
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="skeleton-loading-container">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div key={index}></div>
          ))}
        </div>
      ) : (
        <div className="email-container">
          <Link className="go-back" to={`/c/${emailCategory}`}>
            Back
          </Link>
          <div className="email-sent-info">
            <h1>{emailById.subject || emailById.subject}</h1>
            <p className="category-name">{emailCategory}</p>

            <h2>
              From:
              <span> {emailById.sender.email}</span>
            </h2>
            <h2>
              To:
              <span>{emailById.recipients.toString()}</span>
            </h2>
            <Date
              dateOptions={dateOptions}
              timeOptions={timeOptions}
              createdAt={emailById}
            />
          </div>

          <div className="body-container">
            <p>{emailById.body}</p>
          </div>

          <div className="button-container">
            <button className="replay-button" onClick={replyFunction}>
              Replay
            </button>
            {emailCategory !== "sent" && (
              <button
                className="archived-button"
                onClick={archiveEmailFunction}
              >
                {emailById.archived ? "unarchived" : "archived"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
