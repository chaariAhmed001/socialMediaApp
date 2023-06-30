import { Pagination, PaginationItem } from "@mui/material";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import { Link } from "react-router-dom";

const PaginationComp = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPages, posts } = useSelector((state) => state?.posts) || {};

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    posts?.length >= 7 && (
      <Pagination
        count={numberOfPages}
        page={Number(page)}
        variant="outlined"
        color="primary"
        style={{ marginTop: "40px", padding: "10px 20px" }}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/posts?page=${item.page}`}
            {...item}
            icon={
              item.type === "previous" ? (
                <ArrowBackIcon />
              ) : item.type === "next" ? (
                <ArrowForwardIcon />
              ) : undefined
            }
          />
        )}
      />
    )
  );
};

export default PaginationComp;
