import React from "react";
import Modal from "@mui/material/Modal";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const ConfirmarExclusaoModal = ({ open, onClose, onConfirm, horario }) => {
  return (
    <Modal open={open} onClose={onClose} className="modal-overlay-delete">
      <div className="modal-content-delete">
        <h2 className="modal-title-delete">Confirmar Exclusão</h2>
        <p className="modal-description-delete">
          Você tem certeza que deseja excluir o horário das {horario.horario_inicial.slice(11, 16)} às {horario.horario_final.slice(11, 16)}?
        </p>
        <div className="modal-buttons-delete">
          <button className="btn-delete" onClick={onConfirm}>
            <CheckIcon />
            Confirmar
          </button>
          <button className="btn-delete" onClick={onClose}>
            <ClearIcon />
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmarExclusaoModal;
