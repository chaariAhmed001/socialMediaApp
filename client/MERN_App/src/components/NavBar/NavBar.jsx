import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userProfileString = localStorage.getItem("userProfile");
  const [user, setUser] = useState(
    userProfileString ? JSON.parse(userProfileString) : null
  );
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    setUser(null);
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

  return (
    <AppBar className="appBar" position="static" color="inherit">
      <Typography className="heading" variant="h4" align="left">
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
          Memories
        </Link>
      </Typography>
      <Toolbar className="toolbar">
        {user ? (
          <div className="profil">
            <Avatar
              alt={user?.data?.user?.name}
              src={user?.data?.user?.imageUrl || user?.user?.imageUrl}
              align="center"
              imgProps={{ referrerPolicy: "no-referrer" }}
            >
              {user?.data?.user?.name?.slice(0, 2) || user?.user?.name}
            </Avatar>
            <Typography className="userName" variant="h6">
              {user?.data?.user?.name || user?.user?.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className="logout"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            LinkComponent={Link}
            to="/Login"
          >
            Sign IN
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
