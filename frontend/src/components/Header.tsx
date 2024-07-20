import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Logo from "./shared/Logo";
import Navigation from "./shared/Navigation";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", boxShadow: "none", position: "static" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <Navigation
                text="Go To Chats"
                to="/chats"
                bg="#00fffc"
                textColor="black"
              />
              <Navigation
                text="Logout"
                to="/homepage"
                bg="#51538f"
                textColor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <Navigation
                text="Login"
                to="/login"
                bg="#00fffc"
                textColor="black"
              />
              <Navigation
                text="Signup"
                to="/signup"
                bg="#51538f"
                textColor="white"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
