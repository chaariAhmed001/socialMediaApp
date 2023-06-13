import { Typography } from "@mui/material";
import React from "react";

const Stat = ({ title, stat }) => {
  return (
    <div className="stat_container">
      <span>{stat}</span>
      <p variant="h6">{title}</p>
    </div>
  );
};

export default Stat;
