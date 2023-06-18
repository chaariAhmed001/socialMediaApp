import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const QuiltedImageList = () => {
  const userPosts = useSelector((state) => state?.posts?.userPosts);
  const dispatch = useDispatch();
  const handelPostDetails = (post) => {
    dispatch({ type: "SET_SELECTED_POST", payload: post });
    dispatch({ type: "SET_OPEN_MODAL" });
  };
  return (
    <ImageList
      sx={{
        margin: "40px 0px",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {userPosts?.map((item) => (
        <ImageListItem
          key={item?.title}
          cols={1}
          rows={3}
          className="imageItem"
          onClick={() => handelPostDetails(item)}
        >
          <img
            // {...srcset(item.selectedFile, 121, item.rows, item.cols)}
            src={item?.selectedFile}
            alt={item?.title}
            loading="lazy"
          />
          <div className="cardHover">
            <div className="likes">
              <FavoriteIcon />
              <span>{item?.likes.length}</span>
            </div>
            <div className="comments">
              <ChatBubbleIcon />
              <span>{item?.likes.length}</span>
            </div>
          </div>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default QuiltedImageList;
