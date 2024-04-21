import "./rootlayout.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import inbox from "/src/assets/inbox.svg";
import sent from "/src/assets/sent.svg";
import archived from "/src/assets/archived.svg";
import compose from "/src/assets/compose.svg";
import logOut from "/src/assets/log-out.svg";
import { AuthContext } from "../../AuthContext";
import { axiosInstance } from "../../axiosInstance";

export const Rootlayout = ({ width }) => {
  const titleVisableRef = useRef(false);

  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  let linkArray = [
    { path: "/c/inbox", title: "Inbox" },
    { path: "/c/sent", title: "Sent" },
    { path: "/c/archived", title: "Archived" },
    { path: "/compose", title: "Compose" },
  ];

  if (width < 850) {
    linkArray = [
      { path: "/c/inbox", title: inbox },
      { path: "/c/sent", title: sent },
      { path: "/c/archived", title: archived },
      { path: "/compose", title: compose },
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

        {authState.initialLoading ? (
          <div className="nav-skeleton-loading">
            {[1, 2, 3].map((item, index) => (
              <div key={index}></div>
            ))}
          </div>
        ) : (
          <>
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
                  <button onClick={logOutFunction}>
                    {width < 850 ? (
                      <img src={logOut} alt="logOut-icon" />
                    ) : (
                      <span>Log out</span>
                    )}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </header>
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
};
