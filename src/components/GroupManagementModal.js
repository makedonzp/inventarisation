import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const GroupManagementModal = ({
  isVisible,
  onClose,
  groups,
  onEditGroup,
  onDeleteGroup,
}) => {
  const [editGroup, setEditGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  const handleEdit = (group) => {
    setEditGroup(group);
    setNewGroupName(group);
  };

  const handleSave = () => {
    onEditGroup(editGroup, newGroupName);
    setEditGroup(null);
    setNewGroupName("");
  };

  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Управление группами</h2>
      </div>
      <div className="modal-body">
        <ul className="list-group">
          {groups.map((group, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editGroup === group ? (
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="form-control"
                />
              ) : (
                group
              )}
              <div>
                {editGroup === group ? (
                  <button onClick={handleSave} className="btn btn-success me-2">
                    Сохранить
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(group)}
                    className="btn btn-warning me-2"
                  >
                    Редактировать
                  </button>
                )}
                <button
                  onClick={() => onDeleteGroup(group)}
                  className="btn btn-danger"
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="btn btn-secondary">
          Закрыть
        </button>
      </div>
    </ReactModal>
  );
};

export default GroupManagementModal;
