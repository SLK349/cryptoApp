import React from "react";
import "./MessageModal.css";

const MessageModal = ({ isOpen, content }) => {
  if (!isOpen) {
    return null;
  }

  console.log(isOpen, content);

  return (
    <div className="message-modal">
      <div className="modal-body">{content}</div>
    </div>
  );
};

export default MessageModal;
