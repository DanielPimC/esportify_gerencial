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
        const link = `http://localhost:3003/horarios_aluguel/${idQuadra}`
        const response = await axios.get(link);
        setHorarios(response.data.horarios_aluguel);
        console.log(response.data.horarios_aluguel)
      } catch (error) {
        console.error('Erro ao buscar horários:', error);
      }
    };

    if (idQuadra) {
      fetchHorarios();
    }
  }, [idQuadra]);

  const toggleModal = (dia) => {
    setDiaSelecionado(dia);
    setIsModalOpen(!isModalOpen);
  };

  const adicionarHorario = async (horario) => {
    try {
      const linkGet = `http://localhost:4000/horarios?quadraId=${idQuadra}`
      const linkPost = `http://localhost:4000/horarios`
      await axios.post(linkPost, { ...horario, quadraId: idQuadra });
      const response = await axios.get(linkGet);
      setHorarios(response.data);
    } catch (error) {
      console.error('Erro ao adicionar horário:', error);
    }
  };

  const renderizarHorarios = () => {
    const diasDaSemana = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

    return (
      <div className="horarios-container">
        {diasDaSemana.map((dia) => {
          const horariosDoDia = horarios.filter((horario) => horario.dia_semana.desc_dia === dia)
          return (
            <details key={dia} className="dia-details">
              <summary className="dia-summary">{dia}</summary>
              <div className="horarios-list">
                {horariosDoDia.length > 0 ? (
                  horariosDoDia.map((horario) => (
                    <div key={horario.id} className="horario-card">
                      <p>Horário Início: {horario.horario_inicial}</p>
                      <p>Horário Fim: {horario.horario_final}</p>
                      <p>Valor: {horario.preco}</p>
                    </div>
                  ))
                ) : (
                  <div className="sem-horarios">
                    <p>Sem horários definidos.</p>
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
      <h2 className='gerenciar-horario'>{`Gerenciar Horário - Quadra ${idQuadra}`}</h2>
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
