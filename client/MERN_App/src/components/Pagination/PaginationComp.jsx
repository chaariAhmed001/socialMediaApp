import { Link, Pagination, PaginationItem } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PaginationComp = () => {
  return (
    <Pagination
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      style={{ marginTop: "40px", padding: "10px 20px" }}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/posts/?page=${item.page}`}
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
  );
};

export default PaginationComp;
