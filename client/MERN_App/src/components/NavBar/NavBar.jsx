import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Divider,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import ModalComp from "../ModalComp/ModalComp";
import Search from "./Search";
import jwtDecode from "jwt-decode";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(false);
  const userProfileString = localStorage.getItem("userProfile");
  const [user, setUser] = useState(
    userProfileString ? JSON.parse(userProfileString) : null
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfile = () => {
    handleClose();
    navigate(`/profile?email=${user?.data?.user?.email || user?.user?.email}`);
  };

  const logout = () => {
    navigate("/Login");
    dispatch({ type: "LOGOUT" });
    setUser(null);
    handleClose();
  };
  useEffect(() => {
    const token = user?.token || user?.data?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("userProfile")));
  }, [location]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    dispatch({ type: "SET_OPEN_MODAL" });
  };
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/posts") {
      setCurrentLocation((prev) => true);
    } else {
      setCurrentLocation((prev) => false);
    }
  }, [location]);

  return (
    <AppBar className="appBar" position="static" color="transparent">
      <div className="navBar_left">
        <Typography
          className="heading"
          variant="h4"
          align="left"
          style={{ flex: user ? "1" : "0.68", marginRight: user && "105px" }}
        >
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            Memories
          </Link>
        </Typography>
        {currentLocation && <Search />}
      </div>
      {/* user */}
      <Toolbar className="toolbar">
        {user ? (
          <div className="profil_container">
            <Tooltip title="Create Post" arrow>
              <IconButton onClick={handleOpenModal}>
                <AddIcon className="toggel" />
              </IconButton>
            </Tooltip>
            <div className="user_profile">
              <Avatar
                alt={user?.data?.user?.name}
                src={user?.data?.user?.imageUrl || user?.user?.imageUrl}
                align="center"
                imgProps={{ referrerPolicy: "no-referrer" }}
                sx={{ width: 40, height: 40 }}
              >
                {user?.data?.user?.name?.slice(0, 2) || user?.user?.name}
              </Avatar>
              <Typography className="userName" variant="h6">
                {user?.data?.user?.name || user?.user?.name}
              </Typography>
            </div>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="btn"
            >
              <KeyboardArrowDownIcon className="toggel" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  backgroundColor: "#1E1E1E",
                  color: "white",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "#1E1E1E",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleProfile}>
                <Avatar
                  alt={user?.data?.user?.name}
                  src={user?.data?.user?.imageUrl || user?.user?.imageUrl}
                  align="center"
                  imgProps={{ referrerPolicy: "no-referrer" }}
                  sx={{ width: 40, height: 40 }}
                >
                  {user?.data?.user?.name?.slice(0, 2) || user?.user?.name}
                </Avatar>{" "}
                Profile
              </MenuItem>
              <Divider />

              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" sx={{ color: "white" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            className="bg-red-200 text-blue-500"
            variant="contained"
            color="primary"
            component={Link}
            to="/Login"
          >
            Sign IN
          </Button>
        )}
      </Toolbar>
      <ModalComp />
    </AppBar>
  );
};

export default NavBar;
