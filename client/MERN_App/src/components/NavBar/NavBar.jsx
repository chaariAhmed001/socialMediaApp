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
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddIcon from "@mui/icons-material/Add";
import ModalComp from "../ModalComp/ModalComp";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userProfileString = localStorage.getItem("userProfile");
  const [user, setUser] = useState(
    userProfileString ? JSON.parse(userProfileString) : null
  );

  const isOpenModal = useSelector((state) => state.isOpenModal);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    setUser(null);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const token = user?.token || user?.data?.token;
    if (token) {
      const decodedToken = decodeURI(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    const userProfileString = localStorage.getItem("userProfile");
    setUser(userProfileString ? JSON.parse(userProfileString) : null);
  }, [location]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    dispatch({ type: "SET_OPEN_MODAL" });
  };

  return (
    <AppBar className="appBar" position="static" color="transparent">
      <Typography className="heading" variant="h4" align="left">
        {/* logo */}
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/"
          className="text-red-900 m-96"
        >
          Memories
        </Link>
      </Typography>
      {/* user */}
      <Toolbar className="toolbar">
        {user ? (
          <div className="profil_container">
            <Tooltip title="Create Post" arrow>
              <IconButton onClick={handleOpenModal}>
                <AddIcon className="toggel" />
              </IconButton>
            </Tooltip>
            <IconButton>
              <NotificationsNoneIcon className="toggel" />
            </IconButton>
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
              <MenuItem onClick={handleClose}>
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
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" sx={{ color: "white" }} />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" sx={{ color: "white" }} />
                </ListItemIcon>
                Settings
              </MenuItem>
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
