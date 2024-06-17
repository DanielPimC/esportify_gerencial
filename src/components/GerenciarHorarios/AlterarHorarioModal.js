import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const AlterarHorarioModal = ({ onClose, onAlterar, horario }) => {
  const [novosDados, setNovosDados] = useState({
    horarioInicial: horario.horario_inicial,
    horarioFinal: horario.horario_final,
    preco: horario.preco,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovosDados({ ...novosDados, [name]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Alterar Horário</h2>
        <div className="modal-inputs">
          <label htmlFor="horarioInicial">Horário Inicial:</label>
          <input
            type="time"
            id="horarioInicial"
            name="horarioInicial"
            value={novosDados.horarioInicial}
            onChange={handleChange}
          />
          <label htmlFor="horarioFinal">Horário Final:</label>
          <input
            type="time"
            id="horarioFinal"
            name="horarioFinal"
            value={novosDados.horarioFinal}
            onChange={handleChange}
          />
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={novosDados.preco}
            onChange={handleChange}
          />
        </div>
        <div className="modal-buttons">
          <button className="btn" onClick={() => onAlterar(novosDados)}>
            <CheckIcon />
            Confirmar
          </button>
          <button className="btn" onClick={onClose}>
            <ClearIcon />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlterarHorarioModal;
