import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = null;
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
              alt={user.result.name}
              src={user?.result?.imageUrl}
              align="center"
            >
              {user?.result?.name.chatAt(1)}
            </Avatar>
            <Typography className="userName" variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" color="secondary" className="logout">
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
