import React from "react";

const CNPJForm = ({ cnpj, handleChange, handleSubmit, errorMessage }) => (
  <form onSubmit={handleSubmit} className="register-form-container">
    <h2>Digite o CNPJ:</h2>
    <input
      type="text"
      name="cnpj"
      placeholder="CNPJ"
      value={cnpj}
      onChange={handleChange}
      required
    />
    <button type="submit" className="btn-login">
      Avançar
    </button>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </form>
);

export default CNPJForm;
