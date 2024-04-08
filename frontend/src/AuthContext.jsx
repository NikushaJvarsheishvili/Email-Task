import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "./axiosInstance.js";

export const AuthContext = createContext({
  initialLoading: true,
  user: null,
});

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    initialLoading: true,
    user: null,
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axiosInstance.get("/user/status");
        setAuthState({
          initialLoading: false,
          user: response.data.user,
        });

        console.log(window.location.href);
      } catch (error) {
        setAuthState({
          ...authState,
          initialLoading: true,
        });

        if (!window.location.href.includes("/login")) {
          window.location.href = "/login";
        }
      }
    };

    checkStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};