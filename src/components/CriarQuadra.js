import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CriarQuadra() {
  const [nome, setNome] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaQuadra = {
      id: Date.now(),
      nome,
      rua,
      numero,
      bairro,
      cidade
    };

    try {
      const response = await axios.post('http://localhost:4000/quadras', novaQuadra);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Erro ao adicionar quadra:', error);
    }
  };

  return (
    <div className="quadra-form-container">
      <h2>Adicionar Quadra</h2>
      <form className="quadra-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nome da Quadra:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Digite aqui...'
            required
          />
        </div>
        <div className="input-group">
          <label>Endereço:</label>
          <div className="endereco">
            <input
              type="text"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              placeholder='Rua'
              required
            />
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder='Número'
              required
            />
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder='Bairro'
              required
            />
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder='Cidade'
              required
            />
          </div>
        </div>
        <button className="btn-submit" type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default CriarQuadra;
