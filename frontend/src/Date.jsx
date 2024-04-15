export const Date = ({ dateOptions, timeOptions, createdAt }) => {
  return (
    <p>
      {`${new window.Date(createdAt.createdAt).toLocaleDateString(
        "en-US",
        dateOptions
      )}, ${new window.Date(createdAt.createdAt).toLocaleTimeString(
        "en-US",
        timeOptions
      )}`}
    </p>
  );
};
