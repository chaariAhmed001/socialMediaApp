import React, { useState } from "react";
import "./PostDetails.css";
import { Avatar, Divider, Typography } from "@mui/material";
import moment from "moment";

const PostDetails = ({ post }) => {
  const userProfileString = localStorage.getItem("userProfile");

  const [user, setUser] = useState(
    userProfileString ? JSON.parse(userProfileString) : null
  );

  return (
    <div className="postDetails_container">
      <div className="post_img">
        <img src={post?.selectedFile} />
      </div>
      <div className="post_details">
        <div className="user">
          <Avatar
            alt={user?.data?.user?.name}
            src={user?.data?.user?.imageUrl || user?.user?.imageUrl}
            align="center"
            imgProps={{ referrerPolicy: "no-referrer" }}
            sx={{ width: 44, height: 44 }}
          >
            {user?.data?.user?.name?.slice(0, 2) || user?.user?.name}
          </Avatar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <Typography className="userName" variant="h6">
              {user?.data?.user?.name || user?.user?.name}
            </Typography>
            <Typography variant="body2">
              {moment(post?.createdAt).fromNow()}
            </Typography>
          </div>
        </div>
        <div className="post">
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="card_msg"
          >
            {post?.message}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="h2"
            className="card_tags"
          >
            {post?.tags?.map((tag, index) => (
              <span key={index}>{"#" + tag} </span>
            ))}
          </Typography>
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default PostDetails;
