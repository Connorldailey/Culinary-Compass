import React from 'react';

interface MessageModalProps {
  message: string;
}

const MessageModal: React.FC<MessageModalProps> = ({ message }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
