import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { creatPost, setCurrentPost, updatePost } from "../../actions/posts";
import "./styles.css";
const Forms = () => {
  const dispatch = useDispatch();
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
  //change postDate when we select a post
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
            name: userData?.data?.user?.name || userData?.user?.name,
          })
        )
      : dispatch(
          creatPost({
            ...postData,
            name: userData?.data?.user?.name || userData?.user?.name,
          })
        );
    clear();
  };

  if (!(userData?.data?.user?.name || userData?.user?.name)) {
    return (
      <Paper className="paper">
        <Typography variant="h6" align="center">
          Please SignIn to can create a new post
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    dispatch(setCurrentPost(null));
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };
  return (
    <Paper className="paper">
      <form onSubmit={handleSubmit} autoComplete="off" className="form">
        <Typography variant="h6">
          {currentID ? "Update" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(/,\s*/) })
          }
        />
        <div className="fileInput">
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
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
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Forms;