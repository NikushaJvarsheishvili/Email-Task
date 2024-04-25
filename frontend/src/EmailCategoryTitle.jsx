export const EmailCategoryTitle = ({ emailCategory }) => {
  let categoryTitle;

  if (emailCategory === "inbox") {
    categoryTitle = "Inbox";
  } else if (emailCategory === "sent") {
    categoryTitle = "Sent";
  } else if (emailCategory === "archived") {
    categoryTitle = "Archived";
  }

  return categoryTitle;
};
