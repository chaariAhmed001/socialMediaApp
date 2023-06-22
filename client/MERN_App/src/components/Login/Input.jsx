import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { inputStyle } from "../../styleConst";

const Input = ({
  name,
  handleChange,
  label,
  half,
  type,
  autoFocus,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant="standard"
        style={{ width: half ? "40%" : "100%" }}
        autoFocus={autoFocus}
        type={type}
        {...inputStyle}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      sx={{ color: "white" }}
                    >
                      {type === "password" ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {}
        }
      />
    </Grid>
  );
};

export default Input;
