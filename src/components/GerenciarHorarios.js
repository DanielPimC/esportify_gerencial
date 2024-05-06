import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdicionarHorarioModal from './AdicionarHorarioModal';
import { BASE_URL } from '../services/api-connection';
import Loading from './Loading/Loading';

function GerenciarHorarios() {
    const navigate = useNavigate();
    const [horarios, setHorarios] = useState([]);
    const [diasSemana, setDiasSemana] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [diaSelecionado, setDiaSelecionado] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const idQuadra = localStorage.getItem('idQuadra');

    useEffect(() => {
        if (!idQuadra) {
            navigate('/');
            return;
        }
    }, [idQuadra, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [diasResponse, horariosResponse] = await Promise.all([
                    axios.get(`${BASE_URL}dias_semana`),
                    axios.get(`${BASE_URL}horarios_aluguel/${idQuadra}`)
                ]);
                setDiasSemana(diasResponse.data.dias_da_semana);
                setHorarios(horariosResponse.data.horarios_aluguel);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (idQuadra) {
            fetchData();
        }
    }, [idQuadra]);

    const toggleModal = (dia) => {
        setDiaSelecionado(dia);
        setIsModalOpen(!isModalOpen);
    };

    const adicionarHorario = async (horario) => {
        try {
            setIsLoading(true);
            await axios.post(`${BASE_URL}horario/add`, {
                id_quadra: idQuadra,
                id_dia_semana: horario.id_dia_semana,
                horario_inicial: horario.horario_inicial,
                horario_final: horario.horario_final,
                preco: horario.preco
            });

            const response = await axios.get(`${BASE_URL}horarios_aluguel/${idQuadra}`);
            setHorarios(response.data.horarios_aluguel);
        } catch (error) {
            console.error('Erro ao adicionar horário:', error);
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
                    const horariosDoDia = horarios.filter((horario) => horario.dia_semana.id_dia_semana === dia.id_dia_semana);
                    return (
                        <details key={dia.id_dia_semana} className="dia-details">
                            <summary className="dia-summary">{dia.desc_dia}</summary>
                            <div className="horarios-list">
                                {horariosDoDia.length > 0 ? (
                                    horariosDoDia.map((horario) => (
                                        <div key={horario.id_horario_aluguel} className="horario-card">
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
                    dia={diaSelecionado}
                />
            )}
        </div>
    );
}

export default GerenciarHorarios;
