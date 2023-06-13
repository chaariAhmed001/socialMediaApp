import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

import React, { useEffect } from "react";
import "./styles.css";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deltePost, setCurrentPost } from "../../../actions/posts";
import { useState } from "react";
import { getUserById } from "../../../actions/users";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userProfile"));
  const [checkUser, setCheckUser] = useState(false);
  const userProfileString = localStorage.getItem("userProfile");
  const creatorData = useSelector((state) => state?.login?.creator?.data);
  const [anchorEl, setAnchorEl] = useState(null);
  const openActionMenu = Boolean(anchorEl);
  const [user, setUser] = useState(
    userProfileString ? JSON.parse(userProfileString) : null
  );
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setCheckUser(
      (prev) =>
        (userData?.user?.googleId || userData?.data?.user?._id) ===
        post?.creator
    );
  }, [userData]);
  useEffect(() => {
    dispatch(getUserById(post?.creator));
  }, [post?.creator]);

  const handleUpdate = () => {
    dispatch(setCurrentPost(post?._id));
    dispatch({ type: "SET_OPEN_MODAL" });
    setAnchorEl(null);
  };
  const handleDelete = () => {
    dispatch(deltePost(post?._id));
    setAnchorEl(null);
  };

  const handleClickActionMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseActionMenu = () => {
    setAnchorEl(null);
  };
  const handleShowComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <Card className="card_container">
      <div className="card_header">
        <div className="card_header_left">
          <Avatar
            alt={creatorData?.name}
            src={creatorData?.imageUrl}
            align="center"
            imgProps={{ referrerPolicy: "no-referrer" }}
            sx={{ width: 40, height: 40 }}
          >
            {creatorData?.name?.slice(0, 2) ||
              user?.user?.name ||
              "chaari Ahmed"}
          </Avatar>
          <div className="user_details">
            <Typography variant="h6">{post?.name}</Typography>
            <Typography variant="body2">
              {moment(post?.createdAt).fromNow()}
            </Typography>
          </div>
        </div>
        <div className="card_header_right">
          {checkUser ? (
            <div style={{ position: "relative" }}>
              <IconButton
                id="basic-button"
                aria-controls={openActionMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openActionMenu ? "true" : undefined}
                onClick={handleClickActionMenu}
                className="btn"
              >
                <Tooltip title="Post Action">
                  <MoreHorizIcon fontSize="default" className="toggel" />
                </Tooltip>
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openActionMenu}
                onClose={handleCloseActionMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    backgroundColor: "#323436",
                    color: "white",
                    ml: 2.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: 0,
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
                      bgcolor: "#323436",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                sx={{ fontSize: "14px" }}
              >
                <MenuItem onClick={handleUpdate}>
                  {" "}
                  <EditIcon fontSize="small" sx={{ marginRight: "8px" }} />
                  Edit Post
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  {" "}
                  <DeleteIcon
                    fontSize="small"
                    sx={{ marginRight: "8px" }}
                  />{" "}
                  Delete Post
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <IconButton onClick={() => {}}>
              <Tooltip title="Follow">
                <PersonAddIcon className="toggel" />
              </Tooltip>
            </IconButton>
          )}
        </div>
      </div>
      <CardContent sx={{ padding: "10px 0px" }}>
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
      </CardContent>
      <CardMedia
        className="card_media"
        image={
          post?.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <CardActions className="cardActions">
        <Button
          size="small"
          disabled={!userData}
          onClick={() => {
            dispatch(addLike(post?._id));
          }}
          sx={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}
        >
          <ThumbUpAltIcon
            fontSize="small"
            sx={{
              marginRight: "5px",
            }}
          />{" "}
          <span style={{ marginTop: "2px" }}>Like {post?.likes?.length} </span>
        </Button>
        <Button
          size="small"
          disabled={!userData}
          onClick={handleShowComments}
          sx={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}
        >
          <ChatBubbleIcon
            fontSize="small"
            sx={{
              marginRight: "5px",
            }}
          />{" "}
          <span>Comments {post?.likes?.length} </span>
        </Button>
      </CardActions>
      {showComments && (
        <div className="card_comments">
          <Avatar
            alt={user?.data?.user?.name}
            src={user?.data?.user?.imageUrl || user?.user?.imageUrl}
            align="center"
            imgProps={{ referrerPolicy: "no-referrer" }}
            sx={{ width: 40, height: 40 }}
          >
            {user?.data?.user?.name?.slice(0, 2) || user?.user?.name}
          </Avatar>
          <div className="card_input_container">
            <input
              type="text"
              className="card_input"
              placeholder="Write your comment ..."
            />
            <SendIcon />
          </div>
        </div>
      )}
    </Card>
  );
};

export default Post;
