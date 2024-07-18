import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

const Header = () => {
  return (
    <AppBar
      sx={{ bgcolor: "transparent", boxShadow: "none", position: "static" }}
    >
      <Toolbar sx={{ display: "flex" }} />
    </AppBar>
  );
};

export default Header;
