import React from 'react';

const AdminForm = ({ email, senha, confirmarSenha, handleChange, handleSubmit, errorMessage }) => (
  <form onSubmit={handleSubmit}>
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
    <button type="submit" className="btn-login">Registrar</button>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </form>
);

export default AdminForm;
