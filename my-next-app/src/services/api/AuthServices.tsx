import axios from "axios";
import publicAxios from "../axiosInstance/userInstance";

export const signIn = async (data: { email: string; password: string }) => {
  const response = await publicAxios.post("/user/signIn", data);
  console.log("response", response);
  localStorage.setItem("accessToken", response.data.accessToken);
  console.log("localStorage", localStorage.getItem("accessToken"));
  return response.data;
};
// export const signUp = async (data: {
//   name: string;
//   email: string;
//   password: string;
//   image: string;
// }) => {
//   console.log("enter the AuthServices.signUp");
//   const response = await publicAxios.post("/user/signUp", data);
//   console.log("response", response);
//   return response.data;
// };

export const signUp = async (formData: FormData) => {
  console.log('enter the signUp')
  const response = await publicAxios.post("/user/signUp", formData);

  return response.data;
};
