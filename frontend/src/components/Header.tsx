import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Logo from "./shared/Logo";

const Header = () => {
  return (
    <AppBar
      sx={{ bgcolor: "transparent", boxShadow: "none", position: "static" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
