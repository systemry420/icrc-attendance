import React, { useState, useEffect } from 'react'
import '../index.css'
import { Toast, ToastContainer } from 'react-bootstrap'

const Snackbar = ({ message, pos="top-center" }) => {
  const [show, setShow] = useState(message);

  return (
    <ToastContainer 
      className="p-3" position={pos}>
      <Toast bg="dark" 
        onClose={() => setShow(false)}
        show={message ? true : false} autohide>
        <Toast.Body>
          <span className="text-white">{message}</span>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Snackbar;