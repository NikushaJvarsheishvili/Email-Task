import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "/src/AuthContext";

export const Sent = ({ emailsData }) => {
  const { authState } = useContext(AuthContext);

  return (
    <>
      <h2>sent</h2>
      {emailsData
        .slice()
        .reverse()
        .map((email) => {
          return (
            <Link
              to={`/c/sent/${email._id}`}
              key={email._id}
              className="sents-list-container"
            >
              <h3>{authState.user.email}</h3>

              <p>{email.subject}</p>

              <p>date</p>
            </Link>
          );
        })}
    </>
  );
};
