import { TextField } from "@mui/material";
// import React from "react";

type Props = {
  name: string;
  type: string;
  label: string;
};

export const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      type={props.type}
      label={props.label}
      inputProps={{
        style: {
          width: "400px",
          color: "white",
          borderRadius: 10,
          fontSize: 20,
        },
      }}
    ></TextField>
  );
};
