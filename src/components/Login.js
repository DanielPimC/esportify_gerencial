import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_JSON } from '../services/api-connection';

function Home() {
  const [mode, setMode] = useState('home'); // 'home', 'cnpj', 'register' ou 'login'
  const [cnpj, setCnpj] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate()

  const handleCnpjSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      const response = await axios.get(`${BASE_URL_JSON}empresas?cnpj=${cnpj}`);
      console.log(response.data[0])
      if (response.data[0]) {
        setCompanyName(response.data[0].nome);
        setMode('register');
      } else {
        setErrorMessage('Empresa não encontrada.');
      }
      setCnpj('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocorreu um erro ao buscar a empresa.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL_JSON}user`, {
        token: Date.now(),
        companyName,
        name,
        email,
        password
      });
      console.log(response.data);
      alert('Registrado com sucesso!');
      setEmail('');
      setPassword('');
      setName('');
      setMode('home');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocorreu um erro ao registrar.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL_JSON}user`, {
        email,
        password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setSuccessMessage('Login bem-sucedido!');
      navigate('/gerenciar-quadras')
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Credenciais inválidas.');
    }
  };

  return (
    <div className="container-login">
      <div className="left-panel">
        {mode === 'home' && (
          <div>
            <h2>Escolha uma opção:</h2>
            <button onClick={() => setMode('cnpj')}>REGISTRO</button>
            <button onClick={() => setMode('login')}>LOGIN</button>
          </div>
        )}

        {mode === 'cnpj' && (
          <form onSubmit={handleCnpjSubmit}>
            <h2>Digite o CNPJ:</h2>
            <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
            <button type="submit">Enviar</button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
          </form>
        )}

        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <h2>Login:</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Entrar</button>
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit}>
            <h2>Registrar funcionário:</h2>
            <p>Empresa: {companyName}</p>
            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Registrar</button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
          </form>
        )}
      </div>
      <div className="right-panel">
        <img src="https://i.imgur.com/a4W0QOu.png" alt="Imagem de início" className='img-panel'/>
      </div>
    </div>
  );
}

export default Home;
