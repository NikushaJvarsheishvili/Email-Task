import { axiosInterceptorsInstance } from "./axiosInstance";

export const handleEmailDelete = async (
  e,
  emailId,
  emailsData,
  setEmailsData
) => {
  e.preventDefault();

  console.log(emailsData);

  const response = await axiosInterceptorsInstance.delete(
    `/emails/delete/${emailId}`
  );

  if (response.status === 200 && emailsData) {
    const emailDelete = emailsData.filter((email) => email._id !== emailId);
    setEmailsData(emailDelete);
  }

  if (!emailsData) {
    window.location.href = "/c/inbox";
  }
};
