import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import "./styles.css";
import { Grid, CircularProgress } from "@mui/material";

const Posts = ({ setCurrentID }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts?.length && !isLoading) return "No posts found";
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className="mainContainer" container alignItems="stretch" spacing={3}>
      {posts?.map((post) => (
        <Grid key={post?._id} item xs={12}>
          <Post key={post?._id} post={post} setCurrentID={setCurrentID} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
