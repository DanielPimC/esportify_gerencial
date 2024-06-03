import React from 'react';

const CNPJForm = ({ cnpj, handleChange, handleSubmit, errorMessage }) => (
  <form onSubmit={handleSubmit}>
    <h2>Digite o CNPJ:</h2>
    <input
      type="text"
      name="cnpj"
      placeholder="CNPJ"
      value={cnpj}
      onChange={handleChange}
      required
    />
    <button type="submit" className="btn-login">Enviar</button>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </form>
);

export default CNPJForm;
