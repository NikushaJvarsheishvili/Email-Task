import "./rootlayout.css";
import { NavLink, Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import inbox from "/src/assets/inbox.svg";
import sent from "/src/assets/sent.svg";
import archived from "/src/assets/archived.svg";
import compose from "/src/assets/compose.svg";

export const Rootlayout = () => {
  const { width } = useWindowDimensions();

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

  return (
    <>
      <header>
        <div className="title-container">
          <h1>📮Mail</h1>
        </div>

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

        <div className="user-side-container">
          {/* user email */}
          <h1>email</h1>

          <Link>Log out</Link>
        </div>
      </header>
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
};
