import React from 'react';

function Quadra({ quadra }) {
  const { nome, endereco } = quadra;

  return (
    <div>
      <h3>{nome}</h3>
      <h5>{endereco}</h5>
    </div>
  );
}

export default Quadra;
