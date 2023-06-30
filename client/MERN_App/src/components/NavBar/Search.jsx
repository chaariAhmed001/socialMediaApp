import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getPostsBySearch } from "../../actions/posts";

const Search = styled("div")(({ theme }) => ({
  color: "lightgray",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "lightgray",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "35ch",
    },
  },
}));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const userProfileString = localStorage.getItem("userProfile");

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      searchPost();
    }
  };
  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ tags: search }));
      navigate(`/posts/search?searchQuery=&tags=${search || "none"}`);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (search === "") {
      navigate("/");
    }
  }, [search]);

  return (
    <Search
      style={{
        marginRight: userProfileString ? "30px" : "0px",
        width: "25vw",
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search by Tag…"
        inputProps={{ "aria-label": "search" }}
        name="search"
        value={search}
        label="Search Tag"
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </Search>
  );
}
