import "./category.css";
import { useParams } from "react-router-dom";
import { Inbox } from "./components/Inbox";
import { Sent } from "./components/Sent";
import { Archived } from "./components/Archived";

export const Category = () => {
  const { emailCategory } = useParams();

  let component;
  if (emailCategory === "inbox") {
    component = <Inbox />;
  } else if (emailCategory === "sent") {
    component = <Sent />;
  } else if (emailCategory === "archived") {
    component = <Archived />;
  }

  return <div className="category-container">{component}</div>;
};
