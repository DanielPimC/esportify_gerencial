import React from 'react';
import { useNavigate } from 'react-router-dom';
import EsportifyGerencial from "../../assets/images/esportifyGerencial.png";

const Completion = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img src={EsportifyGerencial} alt='Esportify Gerencial'></img>
      <h3>Boas vindas ao seu gerenciador de quadras!</h3>
      <button onClick={() => navigate('/')} className="btn-login">Fazer login</button>
    </div>
  );
};

export default Completion;
