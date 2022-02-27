import React, { useState, useEffect} from 'react'
import '../index.css'
import { Toast, ToastContainer } from 'react-bootstrap'

const Snackbar = ({message}) => {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 3000);
    return () => {
    };
  }, [message]);

  return (
    <ToastContainer 
      delay={3000}
      className="p-3" position="bottom-center">
      <Toast bg="dark" delay={3000} show={show} autohide>
        <Toast.Body>
          <span className="text-white">{message}</span>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Snackbar;