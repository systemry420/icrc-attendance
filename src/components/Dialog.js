import React from "react";
import "../index.css";
import { Modal } from 'react-bootstrap'

const Dialog = ({ show, title, message, handleCancel, handleOk }) => {
  return (
    <Modal show={show}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <button onClick={handleOk} className="btn border">OK</button>
        <button onClick={handleCancel}  className="btn btn-danger">Cancel</button>
      </Modal.Footer>
    </Modal>
  );
};

export default Dialog;
