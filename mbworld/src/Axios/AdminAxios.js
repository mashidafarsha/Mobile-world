import axios from "axios";
import { AdminBaseUrl } from "../BaseUrls/constance";

const adminAxiosInstance = (tokenName) => {
  const instance = axios.create({
    baseURL: AdminBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(instance, "instance");

  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem(tokenName);
    console.log(token, "token");

    request.headers.Authorization = `Bearer ${token}`;
    return request;
  });
  return instance;
};

export default adminAxiosInstance;
