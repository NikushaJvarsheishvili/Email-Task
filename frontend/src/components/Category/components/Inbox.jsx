import { Link } from "react-router-dom";

export const Inbox = ({ emailsData }) => {
  return (
    <>
      {emailsData.length === 0 ? (
        <h1>no Email</h1>
      ) : (
        <>
          <h2>Inbox</h2>
          {emailsData
            .slice()
            .reverse()
            .map((email) => {
              return (
                <Link
                  to={`/c/inbox/${email._id}`}
                  key={email._id}
                  className="inbox-emails-link"
                >
                  <h3>{email.sender.email}</h3>
                  <p>{email.subject}</p>
                  <p>date</p>
                </Link>
              );
            })}
        </>
      )}
    </>
  );
};
