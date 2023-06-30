import {
  Avatar,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { creatPost, setCurrentPost, updatePost } from "../../actions/posts";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";
import { inputStyle } from "../../styleConst";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
const Forms = () => {
  const dispatch = useDispatch();
  const userProfileString = localStorage.getItem("userProfile");
  const [user, setUser] = useState(
    userProfileString ? JSON.parse(userProfileString) : null
  );
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  // get current post
  const currentID = useSelector((state) => state?.posts.post);
  const post = useSelector((state) =>
    currentID
      ? state?.posts?.posts.find((post) => post._id === currentID)
      : null
  );
  //change postData when we select a post
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const userData = JSON.parse(localStorage.getItem("userProfile"));
  const handleSubmit = (e) => {
    e.preventDefault();
    currentID
      ? dispatch(
          updatePost(currentID, {
            ...postData,
            email: userData?.data?.user?.email || userData?.user?.email,
          })
        )
      : dispatch(
          creatPost({
            ...postData,
            email: userData?.data?.user?.email || userData?.user?.email,
          })
        );
    clear();
    dispatch({ type: "SET_CLOSE_MODAL" });
  };

  const clear = () => {
    dispatch(setCurrentPost(null));
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };
  const handelCloseModal = () => {
    dispatch({ type: "SET_CLOSE_MODAL" });
  };
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="form">
      <div className="form_header_container">
        <div className="form_header_content">
          <Typography variant="h6" className="form_header_title">
            {currentID ? "Edit your" : "Create new"} Memory
          </Typography>
          <IconButton
            className="form_header_closeBtn"
            size="small"
            onClick={handelCloseModal}
          >
            <CloseIcon className="toggel" />
          </IconButton>
        </div>

        <Divider className="form_header_divider" light />
      </div>
      <div className="form_body">
        <div className="user_profile">
          <Avatar
            alt={user?.data?.user?.name}
            src={user?.data?.user?.imageUrl || user?.user?.imageUrl}
            align="center"
            imgProps={{ referrerPolicy: "no-referrer" }}
            sx={{ width: 30, height: 30 }}
          >
            {user?.data?.user?.name?.slice(0, 2) || user?.user?.name}
          </Avatar>
          <p className="userName" variant="h6">
            {user?.data?.user?.name || user?.user?.name}
          </p>
        </div>
        <div className="form_inputs">
          <TextField
            name="title"
            value={postData.title}
            placeholder="Add Title ..."
            variant="standard"
            fullWidth
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            {...inputStyle}
            style={{ marginBottom: "20px", marginTop: "20px" }}
          />
          <TextField
            name="message"
            variant="standard"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            placeholder="Write a message"
            multiline
            rows={4}
            {...inputStyle}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            name="tags"
            variant="standard"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(/,\s*/) })
            }
            placeholder="Add Tags"
            {...inputStyle}
            style={{ marginBottom: "20px" }}
          />
          <div className="fileInput">
            {!postData?.selectedFile ? (
              <div className="fileInput_header">
                <AddPhotoAlternateIcon />
                <Typography variant="h6" component="h6">
                  Add Photos
                </Typography>
              </div>
            ) : (
              <img
                src={postData?.selectedFile}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            )}
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
        </div>
      </div>

      <Button
        className="buttonSubmit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        type="submit"
      >
        Submit
      </Button>
      {/* <Button
        variant="contained"
        color="secondary"
        size="small"
        fullWidth
        onClick={clear}
      >
        Clear
      </Button> */}
    </form>
  );
};

export default Forms;
