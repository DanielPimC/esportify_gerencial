import { useNavigate } from "react-router-dom";

function Quadra({ quadra }) {
  const { id, nome, rua, numero, bairro, cidade, cep } = quadra;
  const navigate = useNavigate()

  const gerenciarQuadra = () => {
    localStorage.setItem("idQuadra", id)
    navigate(`/gerenciar-horarios`)
  };

  return (
    <div className="quadra">
      <button className="btn-show-id" onClick={gerenciarQuadra}>
        …
      </button>
      <h3>{nome}</h3>
      <p>ID {id}</p>
      <h5>Rua {rua}, nº {numero}, bairro {bairro}, cidade {cidade}, CEP {cep}</h5>
    </div>
  );
}

export default Quadra