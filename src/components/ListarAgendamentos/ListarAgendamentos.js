import React, { useEffect, useState } from "react";
import MenuLateral from "../MenuLateral/MenuLateral";
import { BASE_URL } from "../../services/api-connection";
import axios from "axios";
import Loading from "../Loading/Loading";

function ListarAgendamentos() {
  const [horarios, setHorarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const token = localStorage.getItem("token");

  /*if (!token) {
    navigate("/");
  }*/

  useEffect(() => {
    const fetchHorarios = async () => {
      try {

        const token = localStorage.getItem("token");  
        const quadra = localStorage.getItem("idQuadra")
        const response = await axios.get(`${BASE_URL}quadra/alugueis/${quadra}`, {
          headers: {
            Authorization: token
          }
        });
        setHorarios(response.data);
        console.log(response.data);
      } catch (error) {
        if (
          error.response &&
          (error.response.data.error === "Token expired" ||
            error.response.data.error === "jwt malformed")
        ) {
          localStorage.removeItem("token");
        }
        console.error("Erro ao buscar horários:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHorarios();

    const intervalId = setInterval(fetchHorarios, 10000);
    return () => clearInterval(intervalId);
  }, [token]);

  const renderizarHorarios = () => {
    if (isLoading) {
      return <Loading isLoading={isLoading} />;
    }

    if (horarios.length === 0) {
      return (
        <p className="sem-horarios-agendados">Não há horários marcados.</p>
      );
    }

    return (
      <div>
        <ul className="horarios-lista">
          {horarios.rentTimes.map((horario) => (
            <li key={1} className="horario-item">
              <p>Cliente: {horario.usuario.nome}</p>
              <p>Dia: {horario.data}</p>
              <p>
                Horário: De {horario.horario_aluguel.horario_inicial} às {horario.horario_aluguel.horario_final}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="listar-agendamentos">
      <MenuLateral />
      {renderizarHorarios()}
    </div>
  );
}

export default ListarAgendamentos;
