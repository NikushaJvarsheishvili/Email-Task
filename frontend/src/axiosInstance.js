import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const axiosInterceptorsInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

let isAlreadyRedirected = false;
axiosInterceptorsInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response.status === 401 && isAlreadyRedirected) {
      isAlreadyRedirected = true;
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
