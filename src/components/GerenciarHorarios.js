import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdicionarHorarioModal from './AdicionarHorarioModal';

function GerenciarHorarios() {
    const navigate = useNavigate()
  const [horarios, setHorarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState('');
  const idQuadra = localStorage.getItem('idQuadra');

    useEffect(() => {
        if(!idQuadra){
            navigate('/')
            return
        }
    })

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/horarios?idQuadra=${idQuadra}`);
        setHorarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar horários:', error);
      }
    };

    if (idQuadra) { // Adicionado um check para garantir que idQuadra existe antes de fazer a chamada
      fetchHorarios();
    }
  }, [idQuadra]);

  const toggleModal = (dia) => {
    setDiaSelecionado(dia);
    setIsModalOpen(!isModalOpen);
  };

  const adicionarHorario = async (horario) => {
    try {
      await axios.post('http://localhost:4000/horarios', { ...horario, quadraId: idQuadra });
      const response = await axios.get(`http://localhost:4000/horarios?quadraId=${idQuadra}`);
      setHorarios(response.data);
    } catch (error) {
      console.error('Erro ao adicionar horário:', error);
    }
  };

  const renderizarHorarios = () => {
    const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

    return (
      <div className="horarios-container">
        {diasDaSemana.map((dia) => {
          const horariosDoDia = horarios.filter((horario) => horario.dia === dia);
          return (
            <details key={dia} className="dia-details">
              <summary className="dia-summary">{dia}</summary>
              <div className="horarios-list">
                {horariosDoDia.length > 0 ? (
                  horariosDoDia.map((horario) => (
                    <div key={horario.id} className="horario-card">
                      <p>Horário Início: {horario.horarioInicio}</p>
                      <p>Horário Fim: {horario.horarioFim}</p>
                      <p>Valor: {horario.valor}</p>
                    </div>
                  ))
                ) : (
                  <div className="sem-horarios">
                    <p>Sem horários definidos</p>
                  </div>
                )}
                <button onClick={() => toggleModal(dia)}>Adicionar Horário</button>
              </div>
            </details>
          );
        })}
      </div>
    );
  };

  return (
    <div className="horarios-container">
      <h2>{`Gerenciar Horário - Quadra ${idQuadra}`}</h2>
      {renderizarHorarios()}
      {isModalOpen && (
        <AdicionarHorarioModal 
          onClose={() => toggleModal('')} 
          onAddHorario={(horario) => {
            adicionarHorario(horario);
            toggleModal('');
          }} 
          idQuadra={idQuadra}
          dia={diaSelecionado} 
        />
      )}
    </div>
  );
}

export default GerenciarHorarios;
