import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Input from "./Input";
import "./Login.css";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
  };

  const responseGoogle = (response) => {
    // Handle the response from Google login
    console.log(response);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className="paper" elevation={3}>
        <div className="header">
          <Avatar className="avatar">{/* <LockOpenIcon />{" "} */}</Avatar>
          <Typography variant="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="firstName"
                  handleChange={handleChange}
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="lastName"
                  handleChange={handleChange}
                  autoFocus
                />
              </>
            )}
            <Input
              name="email"
              label="Email Adress"
              handleChange={handleChange}
              type="email"
              autoFocus
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              autoFocus
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm your Password"
                handleChange={handleChange}
                type="password"
                handleShowPassword={handleShowPassword}
                autoFocus
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            {" "}
            {isSignUp ? "Sign up" : "Sign IN"}
          </Button>
          <GoogleLogin
            clientId="742219853269-0ods74i6461hvq0eab0oqrl2k6djandq.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <Button
                className="googleButton"
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign IN
              </Button>
            )}
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={handleSwitch}>
                {isSignUp
                  ? "Alredy have an acount ? Sign In"
                  : "Don't have an acount? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
