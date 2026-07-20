import axios from "axios";

const API_URL=process.env.NEXT_PUBLIC_API_URL
const privateAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
privateAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default privateAxios;