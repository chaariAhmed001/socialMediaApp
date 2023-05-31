import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@mui/material";
import Posts from "../Posts/Posts";
import Forms from "../Forms/Forms";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import PaginationComp from "../Pagination/PaginationComp";
import "./Home.css";
import ChipInput from "material-ui-chip-input";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("search") || "";

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      searchPost();
    }
  };

  const handleAddTag = (tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ searchQuery: search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <Grow in>
      <Container mx="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className="gridContainer"
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className="appBarSearch" position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Post"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0px" }}
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
                variant="outlined"
                label="Search Tags"
              />
              <Button
                onClick={searchPost}
                className="searchButton"
                color="primary"
                variant="contained"
              >
                Search Post
              </Button>
            </AppBar>
            <Forms />
          </Grid>
        </Grid>
        <Paper elevation={6}>
          <PaginationComp />
        </Paper>
      </Container>
    </Grow>
  );
};

export default Home;
