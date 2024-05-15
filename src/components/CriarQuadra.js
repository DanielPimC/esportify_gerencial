import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/api-connection";
import Loading from "./Loading/Loading";
import MenuLateral from "./MenuLateral/MenuLateral";

function CriarQuadra() {
  const [nome, setNome] = useState("");
  const [locatario, setLocatario] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCEP] = useState("");
  const id_complexo_esportivo = "018f7a26-bc20-7afd-ba6a-1c66f06e802e";
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaQuadra = {
      nome,
      id_complexo_esportivo,
      /*rua,
      numero,
      bairro,
      cidade,
      cep,
      locatario*/
    };

    try {
      setIsLoading(true);
      console.log(novaQuadra);
      const response = await axios.post(
        `${BASE_URL}quadra/adicionar-quadra`,
        novaQuadra,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      navigate("/gerenciar-quadras");
    } catch (error) {
      if (
        error.response &&
        (error.response.data.error === "Token expired" ||
          error.response.data.error === "jwt malformed")
      ) {
        localStorage.removeItem("token");
      }
      console.error("Erro ao adicionar quadra:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="quadra-form-container">
      <MenuLateral />
      <h2>Adicionar Quadra</h2>
      <Loading isLoading={isLoading} />
      <form className="quadra-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nome da Quadra:</label>
          <input
            type="text"
            className="input-form"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite aqui..."
            //required
          />
          <label>Nome do Locatário:</label>
          <input
            type="text"
            className="input-form"
            value={locatario}
            onChange={(e) => setLocatario(e.target.value)}
            placeholder="Digite aqui..."
            //required
          />
        </div>
        <div className="input-group">
          <label>Endereço:</label>
          <div className="endereco">
            <input
              type="text"
              className="input-form"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              placeholder="Rua"
              //required
            />
            <input
              type="number"
              className="input-form"
              min={0}
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Número"
              //required
            />
            <input
              type="text"
              className="input-form"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Bairro"
              //required
            />
            <input
              type="text"
              className="input-form"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Cidade"
              //required
            />
            <input
              type="text"
              className="input-form"
              value={cep}
              onChange={(e) => setCEP(e.target.value)}
              placeholder="CEP"
              //required
            />
          </div>
        </div>
        <button className="btn-submit" type="submit">
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default CriarQuadra;
