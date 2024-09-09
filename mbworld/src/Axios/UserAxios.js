import axios from "axios";
import { BaseUrl } from "../BaseUrls/constance";

const userAxiosInstance = (tokenName) => {
  const instance = axios.create({
    baseURL: BaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem(tokenName);
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  });
  return instance;
};

export default userAxiosInstance;
