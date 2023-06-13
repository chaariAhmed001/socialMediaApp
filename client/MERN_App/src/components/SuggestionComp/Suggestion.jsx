import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";

const Suggestion = () => {
  return (
    <div className="suggestion_container">
      <div className="suggestion_profile">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="suggestion_profile_details">
          <Typography variant="h6" sx={{ fontSize: "14px" }}>
            Chaari Ahmed
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: "12px", color: "lightgray" }}
          >
            12 friends
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => {}}>
        <Tooltip title="Follow">
          <PersonAddIcon className="toggel" />
        </Tooltip>
      </IconButton>
    </div>
  );
};

export default Suggestion;
