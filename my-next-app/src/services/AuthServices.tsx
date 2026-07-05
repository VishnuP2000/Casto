import axios from "axios";

export const signIn = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    "http://localhost:4000/user/sinIn",
    data
  );

  return response.data;
};