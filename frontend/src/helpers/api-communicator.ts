import axios from "axios";

export const userLogin = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to Login");
  }

  const data = res.data;
  return data;
};
