import { createContext, useEffect, useState } from "react";
import {
  axiosInstance,
  axiosInterceptorsInstance,
  setCsrfToken,
} from "./axiosInstance.js";

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

        setCsrfToken(axiosInstance, response.headers["x-csrf-token"]);
        setCsrfToken(
          axiosInterceptorsInstance,
          response.headers["x-csrf-token"]
        );

        setAuthState({
          ...authState,
          initialLoading: false,
          user: response.data.user,
        });
      } catch (error) {
        setAuthState({
          ...authState,
          initialLoading: false,
        });

        // if (!window.location.href.includes("/login")) {
        //   window.location.href = "/login";
        // }
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
