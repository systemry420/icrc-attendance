import React, { useState } from 'react'
import '../index.css'
import { Toast, ToastContainer } from 'react-bootstrap'

const Snackbar = (show = true) => {
  
  return (
    <ToastContainer show={show} autohide delay={3000} className="p-3" position="bottom-center">
    <Toast bg="dark">
      <Toast.Body>
        <span className="text-white">Hello</span>
      </Toast.Body>
    </Toast>
    </ToastContainer>
  );
}

export default Snackbar;