import { Box, Button, Typography } from "@mui/material";
import { MdOutlineLogin } from "react-icons/md";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomizedInput } from "../components/shared/CustomizedInput";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.withCredentials = true;
function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signin" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signin" });
    } catch (e) {
      console.log(e);

      toast.error("Signing Up Failed", { id: "signin" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chats");
    }
  }, [auth]);
  return (
    <Box width={"100%"} display={"flex"} flex={1} height={"100%"}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            border: "none",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign={"center"}
              padding={2}
              fontWeight={600}
            >
              Signup
            </Typography>
            <CustomizedInput name="name" type="text" label="Full Name" />
            <CustomizedInput name="email" type="email" label="Email" />
            <CustomizedInput name="password" type="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "428px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<MdOutlineLogin />}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Signup;
