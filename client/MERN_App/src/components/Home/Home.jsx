import React, { useEffect } from "react";
import { Container, Grid, Grow } from "@mui/material";
import Posts from "../Posts/Posts";
import Forms from "../Foms/Forms";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //get All posts
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Forms />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
