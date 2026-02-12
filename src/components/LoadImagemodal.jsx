import React from "react";

const LoadImageModal = ({ isOpen, onClose, onContinue, url, setUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Load Image from Website</h3>
          <span className="close-icon" onClick={onClose}>×</span>
        </div>

        <input
          type="text"
          placeholder="http://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={onContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default LoadImageModal;
