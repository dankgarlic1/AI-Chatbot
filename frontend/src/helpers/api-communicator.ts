import axios from "axios";

export const userLogin = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to Login");
  }

  const data = res.data;
  return data;
};
export const userSignup = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }

  const data = res.data;
  return data;
};

export const checkAuthStatus = async () => {
  try {
    // console.log("Called checkAuth status");

    const res = await axios.get("/user/auth-status");
    console.log(res.status);

    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendChatRequest = async (message: string) => {
  try {
    const res = await axios.post("/chats/new", { message });
    if (res.status !== 200) {
      throw new Error("Unable to send Chat");
    }
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getUserChat = async () => {
  try {
    const res = await axios.get("/chats/all-chats");
    if (res.status !== 200) {
      throw new Error("Unable to send Chat");
    }
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserChat = async () => {
  try {
    const res = await axios.delete("/chats/delete");
    if (res.status !== 200) {
      throw new Error("Unable to delete Chat");
    }
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const userLogout = async () => {
  try {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
      throw new Error("Unable to logout user");
    }
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
