import React from "react";
import ReactDom from "react-dom";
import "../index.css";

const DialogDiv = (props) => {
  return (
    <div className="dialog">
      <div className="dialog-title">title</div>
      <div className="dialog-content">content</div>
      <div className="dialog-actions">
        <button className="button">Ok</button>
      </div>
    </div>
  );
};

const Dialog = () => {
  return (
    <>
      {ReactDom.createPortal(
        <DialogDiv />, 
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Dialog;
