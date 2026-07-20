import axios from "axios";
import publicAxios from "../axiosInstance/userInstance";
import privateAxios from "../axiosInstance/PrivetAxios";

export const signIn = async (data: { email: string; password: string }) => {
  const response = await publicAxios.post("/user/signIn", data);
  return response.data;
};
export const signUp = async (formData: FormData) => {
  console.log('enter the signUp')
  console.log('formData',formData)
  const response = await publicAxios.post("/user/signUp", formData);
  console.log('AuthService response',response)

  return response.data;
};
export const profile = async (userId:string) => {
  console.log('enter the profile')
  const response = await privateAxios.post("/user/profile",userId);
  console.log('AuthService response',response)

  return response.data;
};
