import "./rootlayout.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import inbox from "/src/assets/inbox.svg";
import sent from "/src/assets/sent.svg";
import archived from "/src/assets/archived.svg";
import compose from "/src/assets/compose.svg";
import { AuthContext } from "../../AuthContext";
import { axiosInstance } from "../../axiosInstance";

export const Rootlayout = () => {
  const titleVisableRef = useRef(false);
  const { width } = useWindowDimensions();
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

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
    { path: "/c/inbox", title: "Inbox", exact: true },
    { path: "/c/sent", title: "Sent", exact: false },
    { path: "/c/archived", title: "Archived", exact: false },
    { path: "/compose", title: "Compose", exact: false },
  ];

  if (width < 850) {
    linkArray = [
      { path: "/c/inbox", title: inbox, exact: true },
      { path: "/c/sent", title: sent, exact: false },
      { path: "/c/archived", title: archived, exact: false },
      { path: "/compose", title: compose, exact: false },
    ];
    titleVisableRef.current = true;
  } else {
    titleVisableRef.current = false;
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        {titleVisableRef.current || (
          <div className="title-container">
            <a href="/c/inbox">📮Mail</a>
          </div>
        )}

        {authState.user !== null && (
          <nav>
            {linkArray.map((link, index) => {
              return (
                <NavLink to={link.path} key={index}>
                  {width < 850 ? (
                    <img src={link.title} alt="link-icon" />
                  ) : (
                    <span>{link.title}</span>
                  )}
                </NavLink>
              );
            })}
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
