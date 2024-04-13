export const Archived = ({ emailsData }) => {
  return (
    <>
      {emailsData.map((email) => {
        return <div key={email._id}>{/* <h1>{email.subject}</h1> */}</div>;
      })}
    </>
  );
};
