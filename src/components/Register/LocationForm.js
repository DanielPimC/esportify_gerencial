import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BASE_URL_CEP } from '../../services/api-connection';
import Loading from '../Loading/Loading';

const CourtLocationForm = ({
  cep, rua, bairro, numero, complemento, uf, cidade,
  handleChange, handleSubmit, errorMessage, handlePrevStep
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const previousCep = useRef(cep);

  useEffect(() => {
    const fetchAddress = async () => {
      if (cep.length === 8 && cep !== previousCep.current) {
        setIsLoading(true);
        try {
          const response = await axios.get(`${BASE_URL_CEP}/${cep}/json`);
          const { logradouro, bairro, localidade, uf } = response.data;
          handleChange({ target: { name: 'rua', value: logradouro } });
          handleChange({ target: { name: 'bairro', value: bairro } });
          handleChange({ target: { name: 'cidade', value: localidade } });
          handleChange({ target: { name: 'uf', value: uf } });
          previousCep.current = cep;
        } catch (error) {
          console.error("Error fetching address:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(fetchAddress, 500);

    return () => clearTimeout(timeoutId);
  }, [cep, handleChange]);

  return (
    <form onSubmit={handleSubmit} className='register-form-container'>
      <h2>Dados da Arena</h2>
      <input
        type="text"
        name="cep"
        placeholder="CEP"
        value={cep}
        onChange={handleChange}
        required
      />
      {isLoading && <Loading isLoading={isLoading} />}
      <input
        type="text"
        name="rua"
        placeholder="Rua"
        value={rua}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="bairro"
        placeholder="Bairro"
        value={bairro}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="numero"
        placeholder="Número"
        value={numero}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="complemento"
        placeholder="Complemento"
        value={complemento}
        onChange={handleChange}
      />
      <input
        type="text"
        name="uf"
        placeholder="UF"
        value={uf}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="cidade"
        placeholder="Cidade"
        value={cidade}
        onChange={handleChange}
        required
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit" className="btn-login">Concluir</button>
      <button onClick={handlePrevStep} className="btn-login">Voltar</button>
    </form>
  );
};

export default CourtLocationForm;
