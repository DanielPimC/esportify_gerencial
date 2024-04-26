import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../services/api-connection'

function CriarQuadra() {
  const [nome, setNome] = useState('');
  const [locatario, setLocatario] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCEP] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaQuadra = {
      nome,
      rua,
      numero,
      bairro,
      cidade,
      cep,
      locatario
    };

    try {
      console.log(novaQuadra)
      const response = await axios.post(`${BASE_URL}quadra/add`, novaQuadra);
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
          <label>Nome do Locatário:</label>
          <input
            type="text"
            value={locatario}
            onChange={(e) => setLocatario(e.target.value)}
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
              type="number"
              min={0}
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
            <input
              type="text"
              value={cep}
              onChange={(e) => setCEP(e.target.value)}
              placeholder='CEP'
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
