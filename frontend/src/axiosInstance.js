import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});



export const axiosInterceptorsInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
axiosInterceptorsInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
