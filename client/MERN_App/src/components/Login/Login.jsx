import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import "./Login.css";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { gapi } from "gapi-script";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByEmailAction,
  userSignIn,
  userSignUp,
} from "../../actions/users";
import FileBase64 from "react-file-base64";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageUrl: "",
  });
  const clientId =
    "742219853269-0ods74i6461hvq0eab0oqrl2k6djandq.apps.googleusercontent.com";
  const userTest = useSelector((state) => state?.login?.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    isSignUp
      ? dispatch(userSignUp(formData, navigate))
      : dispatch(userSignIn(formData, navigate));
  };
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
  };
  const responseGoogle = async (response) => {
    const user = response?.profileObj;
    const token = response?.tokenId;
    const newUser = {
      firstName: user?.familyName,
      lastName: user?.givenName,
      email: user?.email,
      imageUrl: user?.imageUrl,
    };
    try {
      dispatch(getUserByEmailAction(user?.email));
      userTest === null && dispatch(userSignUp(newUser, navigate));
      dispatch({ type: "AUTH", data: { user, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

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
          <Grid
            container
            spacing={2}
            className="form_inputs"
            style={{ margin: "0px 10px" }}
          >
            {isSignUp && (
              <div className="fullName_inputs">
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
              </div>
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
            {isSignUp && (
              <div
                className="fileInput"
                style={{ marginLeft: "15px", marginTop: "20px" }}
              >
                {!formData?.imageUrl ? (
                  <div className="fileInput_header">
                    <AddPhotoAlternateIcon />

                    <Typography variant="h6" component="h6">
                      Add Photos
                    </Typography>
                  </div>
                ) : (
                  <img
                    src={formData?.imageUrl}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
                <FileBase64
                  name="imageUrl"
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setFormData({ ...formData, imageUrl: base64 })
                  }
                />
              </div>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="submit"
          >
            {" "}
            {isSignUp ? "Sign up" : "Sign IN"}
          </Button>
          <GoogleLogin
            clientId={clientId}
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

          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={handleSwitch} style={{ color: "#3F51B5" }}>
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
