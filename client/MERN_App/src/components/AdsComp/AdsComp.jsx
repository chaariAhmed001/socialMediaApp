import { Paper, Typography } from "@mui/material";
import React from "react";
import "./AdsComp.css";
import adsPhoto from "../../images/photo.png";

const AdsComp = () => {
  return (
    <Paper className="AdsComp_container">
      <Typography variant="h6">Sponsored Ads</Typography>
      <div className="AdsComp_photo">
        <img src={adsPhoto} alt="My Image" />
      </div>
      <div className="AdsComp_brand">
        <Typography variant="h6">Lumina</Typography>
        <span>lumina.com</span>
      </div>

      <p>
        Illuminate your world, inspire your adventures. Discover the beauty
        around you with our carefully curated collection of innovative outdoor
        gear
      </p>
    </Paper>
  );
};

export default AdsComp;
