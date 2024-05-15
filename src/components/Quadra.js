import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

function Quadra({ quadra }) {
  const { id, nome } = quadra;
  //const { rua, numero, bairro, cidade, cep } = quadra.endereco
  const navigate = useNavigate();

  const gerenciarQuadra = () => {
    localStorage.setItem("idQuadra", id);
    localStorage.setItem("nomeQuadra", nome);
    navigate(`/gerenciar-horarios`);
  };

  return (
    <div className="quadra">
      <MenuIcon className="btn-configure" onClick={gerenciarQuadra} />
      <h3>{nome}</h3>
      {/*<p>ID {id_quadra}</p>
      <h5>Rua {rua}, nº {numero}, bairro {bairro}, cidade {cidade}, CEP {cep}</h5>*/}
    </div>
  );
}

export default Quadra;
