// LoginModal.js
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LoginModal = ({ showModal, handleClose, handleLogin }) => {
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You have used up your free document visits. Please sign in to
          continue.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ backgroundColor: "#d74242" }} onClick={handleLogin}>
          Sign In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
