import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userProfile")) || null
  );

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.userToken;
    setUser(JSON.parse(localStorage.getItem("userProfile")) || null);
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
              alt={user?.userData?.name}
              src={user?.userData?.imageUrl}
              align="center"
              imgProps={{ referrerPolicy: "no-referrer" }}
            >
              {user?.userData?.name}
            </Avatar>
            <Typography className="userName" variant="h6">
              {user?.userData?.name}
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
