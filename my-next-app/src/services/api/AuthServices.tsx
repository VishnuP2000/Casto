import axios from "axios";
import publicAxios from "../axiosInstance/userInstance";

export const signIn = async (data: {email: string;password: string;}) => {
  const response = await publicAxios.post("/user/signIn", data);
  console.log('response',response)
  localStorage.setItem("accessToken", response.data.accessToken);
  console.log('localStorage',localStorage.getItem('accessToken'))
  return response.data;
};