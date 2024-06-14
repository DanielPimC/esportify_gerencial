import React from "react";

const AdminForm = ({
  email,
  senha,
  confirmarSenha,
  handleChange,
  handleSubmit,
  errorMessage,
  handlePrevStep,
}) => (
  <form onSubmit={handleSubmit} className="register-form-container">
    <h2>Usuário Administrador</h2>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={email}
      onChange={handleChange}
      required
    />
    <input
      type="password"
      name="senha"
      placeholder="Senha"
      value={senha}
      onChange={handleChange}
      required
    />
    <input
      type="password"
      name="confirmarSenha"
      placeholder="Confirme a Senha"
      value={confirmarSenha}
      onChange={handleChange}
      required
    />
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    <button type="submit" className="btn-login">
      Avançar
    </button>
    <button onClick={handlePrevStep} className="btn-login">
      Voltar
    </button>
  </form>
);

export default AdminForm;
