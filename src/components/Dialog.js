import React from "react";
import "../index.css";
import { Modal } from 'react-bootstrap'

const Dialog = () => {
  return (
    <Modal show={true}>
      <Modal.Header>Hi</Modal.Header>
      <Modal.Body>asdfasdf</Modal.Body>
      <Modal.Footer>This is the footer</Modal.Footer>
    </Modal>
  );
};

export default Dialog;
