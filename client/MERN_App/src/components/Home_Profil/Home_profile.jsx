import React, { useState } from "react";
import "./Home_Profile.css";
import { Avatar, Button, Divider, Typography } from "@mui/material";
import Stat from "./Stat";

const Home_profile = () => {
  const userProfileString = localStorage.getItem("userProfile");
  const [user, setUser] = useState(
    userProfileString ? JSON.parse(userProfileString) : null
  );

  return (
    <div className="Home_profile_container">
      <div className="Home_profile_bar"></div>
      <Avatar
        alt={user?.data?.user?.name}
        src={user?.data?.user?.imageUrl || user?.user?.imageUrl}
        imgProps={{ referrerPolicy: "no-referrer" }}
        sx={{ width: 52, height: 52 }}
        className="Home_profile_img"
      />
      <div className="Home_porfile_body">
        <Typography variant="h6">
          {user?.data?.user?.name || user?.user?.name}
        </Typography>
        <div className="Home_porfile_stats">
          <Stat title="Follwing" stat="12k" />
          <Stat title="Posts" stat="1500" />
          <Stat title="Likes" stat="8K" />
        </div>
        <Divider className="divider" />
        <p className="profile_about">
          Lorem ipsum dolor sit amet elit molestias adipisicing. Accusantium
          corporis harum consectetur.
        </p>
      </div>
      <Button variant="contained" className="profile_button">
        My profile
      </Button>
    </div>
  );
};

export default Home_profile;
