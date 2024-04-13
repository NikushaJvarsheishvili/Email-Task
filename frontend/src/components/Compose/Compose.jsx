import "./compose.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { axiosInstance } from "/src/axiosInstance.js";
import { AuthContext } from "../../AuthContext";

export const Compose = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  const sentEmailFuntion = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const dataJson = Object.fromEntries(formdata.entries());

    const response = await axiosInstance.post("/emails", dataJson);

    if (response.statusText === "OK") {
      navigate(`/c/sent/${response.data.email._id}`);
    }
  };

  return (
    <div className="compose-container">
      <form onSubmit={sentEmailFuntion}>
        <label>
          Recipients
          <input name="recipients" type="text" />
        </label>

        <label>
          Subject
          <input name="subject" type="text" />
        </label>

        <label>
          Body
          <textarea name="body"></textarea>
        </label>

        <div className="button-container">
          <button className="send-button" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
