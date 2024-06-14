import React, { useEffect, useState } from "react";
import MenuLateral from "./MenuLateral/MenuLateral";
import { BASE_URL_JSON } from "../services/api-connection";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading/Loading";

function ListarAgendamentos() {
  const [horarios, setHorarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await axios.get(`${BASE_URL_JSON}horarios`);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = horarios.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div>
        <ul className="horarios-lista">
          {currentItems.map((horario) => (
            <li key={horario.id} className="horario-item">
              <p>Cliente: {horario.cliente}</p>
              <p>Dia: {horario.dia}</p>
              <p>
                Horário: De {horario.horario_inicial} às {horario.horario_final}
              </p>
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <button
            onClick={nextPage}
            disabled={indexOfLastItem >= horarios.length}
          >
            Próxima
          </button>
        </div>
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
