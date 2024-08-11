import React, { useState } from 'react';
import './Modal.scss';

const Modal = ({ isOpen, onClose, onSave, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(status);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close" onClick={onClose}>&times;</button>
        <h4>Cập nhật trạng thái</h4>
        <div className="form-group">
          <label>Trạng thái</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            
            <option value="Chuẩn bị">Chuẩn bị</option>

            <option value="Đang giao">Đang giao</option>
            <option value="Đã giao">Đã giao</option>
          </select>
        </div>
        <div className='modal-button'>
        <button className="btn btn-primary" onClick={handleSave}>Lưu</button>
        <button className="btn btn-default" onClick={onClose}>Đóng</button>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
