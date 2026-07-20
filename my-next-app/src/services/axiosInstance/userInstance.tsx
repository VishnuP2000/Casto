import axios from "axios";

// const API_URL=process.env.NEXT_PUBLIC_API_URL
const publicAxios = axios.create({
  baseURL:"http://localhost:4000",
  withCredentials: true,
});

// console.log("publicAxios he he he ",publicAxios)

export default publicAxios;