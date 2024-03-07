const ConfirmationModal = ({ isOpen, message, onCancel, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <button onClick={onCancel}>취소</button>
          <button onClick={onConfirm}>확인</button>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;