function Quadra({ quadra }) {
  const { nome, rua, numero, bairro, cidade } = quadra;

  return (
    <div className="quadra">
      <h3>{nome}</h3>
      <h5>Rua {rua}, nº {numero}, bairro {bairro}, cidade {cidade}</h5>
    </div>
  );
}

export default Quadra;