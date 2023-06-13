import { Avatar, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import "./SuggestionComp.css";
import Suggestion from "./Suggestion";

const SuggestionComp = () => {
  return (
    <Paper className="suggestionComp_container">
      <Typography variant="h6" sx={{ fontSize: "16px" }}>
        Suggesions for you
      </Typography>
      <div className="suggestion_list">
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </div>
    </Paper>
  );
};

export default SuggestionComp;
