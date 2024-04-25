import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Quadra from './Quadra';
import CriarQuadra from './CriarQuadra';
import axios from 'axios';

function GerenciarQuadras() {
  const [quadras, setQuadras] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQuadras = async () => {
      try {
        const link = `http://localhost:4000/quadras`
        const response = await axios.get(link);
        setQuadras(response.data);
      } catch (error) {
        console.error('Erro ao buscar quadras:', error);
      }
    };

    fetchQuadras();
  }, []);

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
    <div className="container">
      <div className="menu">
        <ul>
          <li onClick={() => navigate('/gerenciar-quadras')}>Gerenciar Quadras</li>
          <li onClick={() => navigate('/listar-agendamentos')}>Listar Agendamentos</li>
        </ul>
      </div>
      <div className="content">
        <div className="button-container">
          <Link to="/criar-quadra" className="btn-add-quadra">
            <span className="plus">+</span>
            <br />
            Adicionar quadra
          </Link>
        </div>
        <div className="quadras-container">
          {renderizarQuadras()}
        </div>
      </div>
      <Routes>
        <Route path="/criar-quadra" element={<CriarQuadra onAddQuadra={adicionarQuadra} />} />
      </Routes>
    </div>
  );
}

export default GerenciarQuadras;
