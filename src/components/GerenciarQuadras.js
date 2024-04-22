import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Quadra from './Quadra';
import CriarQuadra from './CriarQuadra';

function GerenciarQuadras() {
  const [quadras, setQuadras] = useState([]);

  const adicionarQuadra = (novaQuadra) => {
    setQuadras([...quadras, novaQuadra]);
  };

  const renderizarQuadras = () => {
    if (quadras.length === 0) {
      return <p>Nenhuma quadra adicionada ainda.</p>;
    }

    return (
      <div className="quadras-list">
        {quadras.map((quadra) => (
          <Quadra key={quadra.id} quadra={quadra} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="menu">
        <ul>
          <li>Gerenciar Quadras</li>
          <li>Gerenciar Horários</li>
        </ul>
      </div>
      <div className="content">
        <Link to="/criar-quadra" className="btn-add-quadra">
          <span className="plus">+</span>
          <br />
          Adicionar quadra
        </Link>
        {renderizarQuadras()}
      </div>

      <Routes>
        <Route path="/criar-quadra" element={<CriarQuadra onSubmitQuadra={adicionarQuadra} />} />
      </Routes>
    </div>
  );
}

export default GerenciarQuadras;
