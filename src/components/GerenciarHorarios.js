import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdicionarHorarioModal from "./AdicionarHorarioModal";
import { BASE_URL } from "../services/api-connection";
import Loading from "./Loading/Loading";
import MenuLateral from "./MenuLateral/MenuLateral";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";

function GerenciarHorarios() {
  const navigate = useNavigate();
  const [horarios, setHorarios] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const idQuadra = localStorage.getItem("idQuadra");
  const nomeQuadra = localStorage.getItem("nomeQuadra");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !idQuadra) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [diasResponse, horariosResponse] = await Promise.all([
          axios.get(`${BASE_URL}dias_semana`, {
            headers: { Authorization: token },
          }),
          axios.get(`${BASE_URL}quadra/horarios/${idQuadra}`, {
            headers: { Authorization: token },
          }),
        ]);
        console.log(horariosResponse.data.times);
        setDiasSemana(diasResponse.data.dias_da_semana);
        setHorarios(horariosResponse.data.times);
      } catch (error) {
        if (
          error.response &&
          (error.response.data.error === "Token expired" ||
            error.response.data.error === "jwt malformed")
        ) {
          localStorage.removeItem("token");
        }
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idQuadra, token, navigate]);

  const toggleModal = (dia) => {
    setDiaSelecionado(dia);
    setIsModalOpen(!isModalOpen);
  };

  const adicionarHorario = async (horario) => {
    try {
      console.log(horario);
      console.log(`ID DO DIA SELECIONADO: ${diaSelecionado.id}`);
      console.log(horario);
      setIsLoading(true);

      await axios.post(
        `${BASE_URL}quadra/adicionar-horario`,
        {
          id_quadra: idQuadra,
          id_dia_semana: diaSelecionado.id,
          horario_inicial: horario.horario_inicial,
          horario_final: horario.horario_final,
          preco: horario.preco,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const response = await axios.get(
        `${BASE_URL}quadra/horarios/${idQuadra}`,
        { headers: { Authorization: token } }
      );
      setHorarios(response.data.times);
    } catch (error) {
      if (
        error.response &&
        (error.response.data.error === "Token expired" ||
          error.response.data.error === "jwt malformed")
      ) {
        localStorage.removeItem("token");
      }
      console.error("Erro ao adicionar horário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderizarHorarios = () => {
    if (isLoading) {
      return <Loading isLoading={isLoading} />;
    }

    return (
      <div className="horarios-container">
        {diasSemana.map((dia) => {
          const horariosDoDia = horarios.filter(
            (horario) => horario.id_dia_semana === dia.id
          );
          const horariosMarcados = horariosDoDia.filter(
            (horario) => horario.status === "ATIVO"
          );

          return (
            <details key={dia.id} className="dia-details">
              <summary className="dia-summary">{dia.desc_dia}</summary>
              <div className="horarios-list">
                {horariosMarcados.length > 0 ? (
                  horariosMarcados.map((horario) => (
                    <div key={horario.id} className="horario-card">
                      <p>
                        Horário Início: {horario.horario_inicial.slice(11, 16)}
                      </p>
                      <p>Horário Fim: {horario.horario_final.slice(11, 16)}</p>
                      <p>Valor: {horario.preco}</p>
                      <DeleteIcon
                        onClick={() => alert(`ID delete: ${horario.id}`)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="sem-horarios">
                    <p>Sem horários definidos.</p>
                  </div>
                )}
                <button onClick={() => toggleModal(dia)}>
                  Adicionar Horário
                </button>
              </div>
            </details>
          );
        })}
      </div>
    );
  };

  return (
    <div className="horarios-container">
      <MenuLateral />
      <h2 className="gerenciar-horario">
        <AlarmIcon style={{ padding: "5px" }} />
        Gerenciar Horário - {nomeQuadra}
      </h2>
      {renderizarHorarios()}
      {isModalOpen && (
        <AdicionarHorarioModal
          onClose={() => toggleModal("")}
          onAddHorario={(horario) => {
            adicionarHorario(horario);
            toggleModal("");
          }}
          dia={diaSelecionado}
        />
      )}
    </div>
  );
}

export default GerenciarHorarios;
