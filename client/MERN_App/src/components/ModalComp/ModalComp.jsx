import React from "react";
import { Modal, Box } from "@mui/material";
import Forms from "../Forms/Forms";
import { useDispatch, useSelector } from "react-redux";
import "./ModalComp.css";
const ModalComp = () => {
  const { isOpenModal } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch({ type: "SET_CLOSE_MODAL" });
  };

  return (
    <Modal
      open={isOpenModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal_container" style={{ position: "absolute" }}>
        <Forms />
      </Box>
    </Modal>
  );
};

export default ModalComp;
