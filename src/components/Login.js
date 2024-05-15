import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/api-connection";
import Loading from "./Loading/Loading";

function Home() {
  const [mode, setMode] = useState("home");
  // const [cnpj, setCnpj] = useState('');
  // const [companynome, setCompanynome] = useState(''); //VAI VIRAR ID COMPLEXO ESPORTIVO.
  const id_complexo_esportivo = "018f7a26-bc20-7afd-ba6a-1c66f06e802e";
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /*  const handleCnpjSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setErrorMessage('');
      const response = await axios.get(`${BASE_URL}empresas?cnpj=${cnpj}`);
      console.log(response.data[0]);
      if (response.data[0]) {
        //setCompanynome(response.data[0].nome);
        setMode('register');
      } else {
        setErrorMessage('Empresa não encontrada.');
      }
      setCnpj('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocorreu um erro ao buscar a empresa.');
    } finally {
      setIsLoading(false);
    }
  };
*/

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}administrador/singup`, {
        email,
        senha,
        nome,
        id_complexo_esportivo,
      });
      console.log(response.data);
      alert("Registrado com sucesso!");
      setEmail("");
      setSenha("");
      setNome("");
      setMode("home");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Ocorreu um erro ao registrar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}administrador/login`, {
        email,
        senha,
        id_complexo_esportivo,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/gerenciar-quadras");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Credenciais inválidas.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-login">
      <div className="left-panel">
        <img
          src="https://i.imgur.com/yybPDhp.png"
          className="img-esportify"
          alt="Esportify"
        ></img>

        <div className="login-form-container">
          {mode === "home" && (
            <div className="options">
              <h2>Escolha uma opção:</h2>
              <button className="btn-login" onClick={() => setMode("register")}>
                REGISTRO
              </button>
              <button className="btn-login" onClick={() => setMode("login")}>
                LOGIN
              </button>
            </div>
          )}

          {mode === "login" && (
            <form onSubmit={handleLoginSubmit}>
              <h2>Login:</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button type="submit" className="btn-login">
                Entrar
              </button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          )}

          {mode === "register" && (
            <form onSubmit={handleRegisterSubmit}>
              <h2>Registrar funcionário:</h2>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button type="submit" className="btn-login">
                Registrar
              </button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          )}

          {/*mode === 'cnpj' && (
            <form onSubmit={handleCnpjSubmit}>
              <h2>Digite o CNPJ:</h2>
              <input type="text" className='input-login' value={cnpj} onChange={(e) => setCnpj(e.target.value)} required/>
              <button type="submit" className='btn-login'>Enviar</button>
              {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </form>
          )} */}
        </div>
      </div>
      <div className="right-panel">
        <img
          src="https://i.imgur.com/a4W0QOu.png"
          alt="Imagem de início"
          className="img-panel"
        />
      </div>

      {isLoading && <Loading isLoading={isLoading} />}
    </div>
  );
}

export default Home;
