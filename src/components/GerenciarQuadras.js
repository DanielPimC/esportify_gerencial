import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Quadra from "./Quadra";
import CriarQuadra from "./CriarQuadra";
import Loading from "./Loading/Loading";
import MenuLateral from "./MenuLateral/MenuLateral";
import axios from "axios";
import { BASE_URL } from "../services/api-connection";

function GerenciarQuadras() {
  const [isLoading, setIsLoading] = useState(true);
  const [quadras, setQuadras] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }

  useEffect(() => {
    const fetchQuadras = async () => {
      try {
        const response = await axios.get(`${BASE_URL}quadra`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data.courts);
        setQuadras(response.data.courts);
      } catch (error) {
        if (
          error.response &&
          (error.response.data.error === "Token expired" ||
            error.response.data.error === "jwt malformed")
        ) {
          localStorage.removeItem("token");
        }
        console.error("Erro ao buscar quadras:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuadras();
  }, [token]);

  const adicionarQuadra = (novaQuadra) => {
    setQuadras([...quadras, novaQuadra]);
  };

  const renderizarQuadras = () => {
    if (isLoading) {
      return <Loading isLoading={isLoading} />;
    }

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
      <MenuLateral />
      <div>
        <div className="button-container">
          <p className="minhas-quadras">Minhas quadras:</p>
          <Link to="/criar-quadra" className="btn-add-quadra">
            <p>+ Adicionar quadra</p>
          </Link>
        </div>
        <div className="quadras-container">{renderizarQuadras()}</div>
      </div>
      <Routes>
        <Route
          path="/criar-quadra"
          element={<CriarQuadra onAddQuadra={adicionarQuadra} />}
        />
      </Routes>
    </div>
  );
}

export default GerenciarQuadras;
