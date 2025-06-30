import axios from "axios";
import {baseUrl} from "../utils/Constant"

 const axiosInstance = axios.create({
    baseURL: baseUrl,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);
export default axiosInstance