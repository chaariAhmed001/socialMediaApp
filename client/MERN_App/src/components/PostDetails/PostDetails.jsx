import React from "react";

const PostDetails = ({ post }) => {
  return (
    <div className="postDetails_container">
      <div className="post_img">
        <img src={post?.selectedFile} />
      </div>
      <div className="post_details">
        <p>qdqdsqd</p>
      </div>
    </div>
  );
};

export default PostDetails;
