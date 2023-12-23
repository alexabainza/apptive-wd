import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LoginModal = ({ title, message, exitbutton,showModal, handleClose, handleLogin }) => {
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {message}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ backgroundColor: "#d74242" }} onClick={handleLogin}>
          {exitbutton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
