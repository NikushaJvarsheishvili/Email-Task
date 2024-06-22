import axios from "axios";

const config = {
  baseURL: "/api",
  withCredentials: true,
};

export const axiosInstance = axios.create(config);

export const axiosInterceptorsInstance = axios.create(config);
axiosInterceptorsInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const setCsrfToken = (inputInstance, csrfToken) => {
  const requestMethods = ["post", "put", "patch", "delete"];

  requestMethods.forEach((method) => {
    inputInstance.defaults.headers[method]["X-CSRF-Token"] = csrfToken;
  });
};
