import React from "react";
import { Modal, Box } from "@mui/material";
import Forms from "../Forms/Forms";
import { useDispatch, useSelector } from "react-redux";
import "./ModalComp.css";
import PostDetails from "../PostDetails/PostDetails";
const ModalComp = () => {
  const { isOpenModal, selectedPost } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch({ type: "SET_CLOSE_MODAL" });
    dispatch({ type: "SET_SELECTED_POST", payload: null });
  };

  return (
    <Modal
      open={isOpenModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="modal_container"
        style={{
          position: "absolute",
          padding: selectedPost ? "0px" : "10px",
        }}
        sx={{
          width: selectedPost ? "70%" : "450px",
          left: selectedPost ? "15%" : "30%",
        }}
      >
        {selectedPost ? <PostDetails post={selectedPost} /> : <Forms />}
      </Box>
    </Modal>
  );
};

export default ModalComp;
