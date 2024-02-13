import React from "react";
import "./ReconnectModal.css";

const ReconnectModal = ({ show, onClose, message }) => {
  if (!show) return null;

  return (
    <div className="reconnectModal">
      <div className="reconnectModal-content">
        <p>{message}</p>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default ReconnectModal;
