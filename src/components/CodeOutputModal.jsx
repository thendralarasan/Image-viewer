const CodeOutputModal = ({ code, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Generated HTML Code</h3>

        <textarea
          value={code}
          readOnly
          style={{ width: "100%", height: "220px" }}
        />

        <div className="modal-actions">
          <button onClick={() => navigator.clipboard.writeText(code)}>
            Copy
          </button>

          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CodeOutputModal;