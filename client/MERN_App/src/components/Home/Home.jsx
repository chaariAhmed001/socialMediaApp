import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Grid, Grow } from "@mui/material";
import Posts from "../Posts/Posts";
import PaginationComp from "../Pagination/PaginationComp";
import "./Home.css";
import Home_profile from "../Home_Profil/Home_profile";
import AdsComp from "../AdsComp/AdsComp";
import SuggestionComp from "../SuggestionComp/SuggestionComp";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const query = useQuery();
  const page = query.get("page") || 1;
  const userProfileString = localStorage.getItem("userProfile");

  return (
    <Grow in>
      <Container mx="xl" className="home-container">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className="gridContainer"
        >
          <Grid item xs={12} sm={6} md={3}>
            {userProfileString && <Home_profile />}
            <AdsComp />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SuggestionComp />
          </Grid>
        </Grid>
        <PaginationComp page={page} />
      </Container>
    </Grow>
  );
};

export default Home;
