import React, { useState } from 'react';
import ProgressBar from './ProgressBar/ProgressBar';
import CNPJForm from './CNPJForm';
import AdminForm from './AdminForm';
import CourtLocationForm from './LocationForm';
import Completion from './Completion';
import ImageStep01 from "../../assets/images/step1.png";
import ImageStep02 from "../../assets/images/step2.png";
import ImageStep03 from "../../assets/images/step3.png";
import ImageStep04 from "../../assets/images/step4.png";

const Register = () => {
  const [step, setStep] = useState(0);
  const [cnpj, setCnpj] = useState("");
  const [adminData, setAdminData] = useState({ email: "", senha: "", confirmarSenha: "" });
  const [locationData, setLocationData] = useState({
    cep: "", rua: "", bairro: "", numero: "", complemento: "", uf: "", cidade: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleNextStep = () => {
    setErrorMessage("");
    setStep(step + 1);
  };
  
  const handlePrevStep = () => {
    setErrorMessage("");
    setStep(step - 1);
  };

  const handleCnpjSubmit = async (e) => {
    e.preventDefault();
    // Simulate API call
    handleNextStep();
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (adminData.senha !== adminData.confirmarSenha) {
      setErrorMessage("As senhas são diferentes.");
      return;
    }
    setErrorMessage("");
    // Simulate API call
    handleNextStep();
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    handleNextStep();
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const images = [ImageStep01, ImageStep02, ImageStep03, ImageStep04];
  const imagesAlt = ["Etapa 1 - CNPJ", "Etapa 2 - Usuário", "Etapa 3 - Endereço da Arena", "Etapa 4 - Conclusão"];
  const stepDescriptions = [
    <p className='text-register'>Vamos começar com o <strong>CNPJ</strong> da empresa</p>,
    <p className='text-register'>Escolha um <strong>Email</strong> e uma <strong>Senha</strong> para entrar.</p>, 
    <p className='text-register'>Digite o <strong>endereço</strong> do seu <strong>complexo esportivo</strong>.</p>,
    <p className='text-register'>Cadastro <strong>concluído</strong></p>
  ];

  return (
    <div className="register-container">
      <div className="register-left">
        {stepDescriptions[step]}
        <img src={images[step]} alt={imagesAlt[step]} />
      </div>
      <div className="register-right">
        <ProgressBar step={step} />
        {step === 0 && <CNPJForm cnpj={cnpj} handleChange={(e) => setCnpj(e.target.value)} handleSubmit={handleCnpjSubmit} errorMessage={errorMessage} />}
        {step === 1 && <AdminForm {...adminData} handleChange={(e) => setAdminData({ ...adminData, [e.target.name]: e.target.value })} handleSubmit={handleAdminSubmit} errorMessage={errorMessage} handlePrevStep={handlePrevStep}/>}
        {step === 2 && <CourtLocationForm {...locationData} handleChange={handleLocationChange} handleSubmit={handleLocationSubmit} errorMessage={errorMessage} handlePrevStep={handlePrevStep}/>}
        {step === 3 && <Completion />}
      </div>
    </div>
  );
};

export default Register;
