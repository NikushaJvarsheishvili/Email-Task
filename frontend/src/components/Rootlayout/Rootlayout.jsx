import "./rootlayout.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import inbox from "/src/assets/inbox.svg";
import sent from "/src/assets/sent.svg";
import archived from "/src/assets/archived.svg";
import compose from "/src/assets/compose.svg";
import { AuthContext } from "../../AuthContext";
import { axiosInstance } from "../../axiosInstance";

export const Rootlayout = () => {
  const { width } = useWindowDimensions();
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(authState);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  let linkArray = [
    { path: "inbox", title: "Inbox" },
    { path: "sent", title: "Sent" },
    { path: "archived", title: "Archived" },
    { path: "compose", title: "Compose" },
  ];

  if (width < 800) {
    linkArray = [
      { path: "inbox", title: inbox },
      { path: "sent", title: sent },
      { path: "archived", title: archived },
      { path: "compose", title: compose },
    ];
  }

  const logOutFunction = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.delete("/user/logout");

      if (response.statusText === "OK") {
        navigate("/login");
        setAuthState({
          ...authState,
          user: null,
        });
        // console.log("1231");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <div className="title-container">
          <h1>📮Mail</h1>
        </div>

        {authState.user !== null && (
          <nav>
            {linkArray.map((link, index) => (
              <NavLink to={`/${link.path}`} key={index}>
                {width < 800 ? (
                  <img src={link.title} alt="link-icon" />
                ) : (
                  <span>{link.title}</span>
                )}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="user-side-container">
          {authState.user !== null && (
            <>
              <h3>{authState.user.email}</h3>
              <button onClick={logOutFunction}>Log out</button>
            </>
          )}
        </div>
      </header>
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
};
