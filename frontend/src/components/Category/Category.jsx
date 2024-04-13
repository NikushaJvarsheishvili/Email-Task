import "./category.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Inbox } from "./components/Inbox";
import { Sent } from "./components/Sent";
import { Archived } from "./components/Archived";
import { axiosInstance } from "../../axiosInstance";

export const Category = () => {
  const { emailCategory } = useParams();
  const [emailsData, setEmailsData] = useState([]);

  useEffect(() => {
    const getEmailsFunction = async () => {
      const response = await axiosInstance.get(`/emails/c/${emailCategory}`);
      setEmailsData(response.data.emails);
    };

    getEmailsFunction();

    return () => {
      setEmailsData([]);
    };
  }, [emailCategory]);
  console.log(emailsData);

  let component;
  if (emailCategory === "inbox") {
    component = <Inbox emailsData={emailsData} />;
  } else if (emailCategory === "sent") {
    component = <Sent emailsData={emailsData} />;
  } else if (emailCategory === "archived") {
    component = <Archived emailsData={emailsData} />;
  }

  return <div className="category-container">{component}</div>;
};
