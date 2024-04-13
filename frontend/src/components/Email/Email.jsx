import "./email.css";
import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosInstance";

export const Email = () => {
  const { emailId, emailCategory } = useParams();

  const [emailById, setEmailById] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const emailFindByIdFunction = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/emails/${emailId}`);
        setEmailById(response.data.email);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };

    emailFindByIdFunction();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <div className="email-container">
          <Link to={`/c/${emailCategory}`}>Back</Link>

          <h1>{emailById.subject || emailById.subject}</h1>
          <br />
          <p>{emailCategory}</p>
          <br />
          {/* <h2>From: {authState.user !== null && authState.user.email}</h2> */}
          <h2>From: {emailById.sender.email && emailById.sender.email}</h2>
          <h2>To: {emailById.recipients[0] || emailById.recipients[0]} </h2>
        </div>
      )}
    </>
  );
};
