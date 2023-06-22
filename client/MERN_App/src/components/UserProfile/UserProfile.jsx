import React, { useEffect } from "react";
import Stat from "../Home_Profil/Stat";
import "./UserProfile.css";
import {
  Avatar,
  Container,
  Grid,
  Grow,
  Typography,
  Divider,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmailAction } from "../../actions/users";
import QuiltedImageList from "./QuiltedImageList";
import { getUserPosts } from "../../actions/posts";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [queryParameters] = useSearchParams();
  let email = queryParameters.get("email");
  const userData = useSelector((state) => state?.login?.user);
  useEffect(() => {
    dispatch(getUserByEmailAction(email));
    dispatch({ type: "SET_USER_PROFILE", payload: email });
    dispatch(getUserPosts(email));
  }, [email]);
  return (
    <Grow in>
      <Container mx="xl" className="userProfil_container">
        <Grid container>
          <div className="profile_header">
            <div className="profile_bar"></div>
            <Avatar
              alt={userData?.name}
              src={userData?.imageUrl}
              imgProps={{ referrerPolicy: "no-referrer" }}
              sx={{ width: 100, height: 100 }}
              className="profile_img"
            />
            <div className="Home_porfile_body">
              <Typography variant="h6">{userData?.name}</Typography>
              <Typography
                variant="h6"
                sx={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}
              >
                {userData?.email}
              </Typography>

              <div className="Home_porfile_stats" style={{ margin: "20px" }}>
                <Stat title="Follwing" stat="12k" />
                <Stat title="Posts" stat="1500" />
                <Stat title="Likes" stat="8K" />
              </div>

              {/* 
              <p className="profile_about">
                Lorem ipsum dolor sit amet elit molestias adipisicing.
                Accusantium corporis harum consectetur.
              </p> */}
            </div>
          </div>
          <Divider className="divider" />
        </Grid>
        <QuiltedImageList />
      </Container>
    </Grow>
  );
};

export default UserProfile;
