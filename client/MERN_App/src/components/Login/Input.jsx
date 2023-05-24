import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
const Input = ({
  name,
  half,
  handleChange,
  label,
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
        variant="outlined"
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
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
