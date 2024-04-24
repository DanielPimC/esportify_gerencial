import React, { useState } from 'react';

function AdicionarHorarioModal({ onClose, onAddHorario, idQuadra, dia }) {
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');
  const [valor, setValor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoHorario = {
      id: Date.now(),
      dia,
      horarioInicio,
      horarioFim,
      valor,
      disponivel: "sim"
    };

    onAddHorario(novoHorario);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar Horário</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Horário Início:</label>
            <input
              type="time"
              value={horarioInicio}
              onChange={(e) => setHorarioInicio(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Horário Fim:</label>
            <input
              type="time"
              value={horarioFim}
              onChange={(e) => setHorarioFim(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Valor:</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          <button type="submit">Adicionar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default AdicionarHorarioModal;
