import React, { useRef, useState } from "react";
import "./CommentSection.css";
import SendIcon from "@mui/icons-material/Send";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { postComment } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const userProfileString = localStorage.getItem("userProfile");
  const [user, setUser] = useState(
    userProfileString ? JSON.parse(userProfileString) : null
  );
  const [comment, setComment] = useState(""); // Corrected variable name
  const [comments, setComments] = useState(post?.comments);
  const commentInputRef = useRef(null);
  const commentRef = useRef();

  const handelSend = async () => {
    const finalComment = {
      name: user?.data?.user?.name || user?.user?.name,
      comment: comment,
    };
    const newComments = await dispatch(postComment(finalComment, post?._id));
    setComments(newComments);
    commentInputRef.current.value = "";
    // commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="card_comments">
      <div className="comments">
        {comments.map((comment, index) => (
          <p key={index}>
            <strong>{comment?.name}</strong> {comment?.comment}
          </p>
        ))}
        <div ref={commentRef} />
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: "10px",
        }}
      >
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
            onChange={(e) => setComment(e.target.value)}
            ref={commentInputRef}
          />
          <SendIcon onClick={handelSend} />
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
