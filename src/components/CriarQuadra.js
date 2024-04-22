import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CriarQuadra({ onAddQuadra }) {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!nome.trim() || !endereco.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    const novaQuadra = {
      id: Date.now(),
      nome,
      endereco,
    };
  
    onAddQuadra(novaQuadra);
    navigate('/');
  };
  

  return (
    <div>
      <h2>Adicionar Quadra</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Quadra: </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Digite aqui...'
          />

          <label>Endereço: </label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder='Digite aqui...'
          />

        {/*
        Nome
        Endereço

        */}

        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default CriarQuadra;
