import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SportsIcon from '@mui/icons-material/Sports';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const MenuLateral = () => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <div className="menu-lateral">
      <div className="seta-voltar" onClick={handleVoltar}>
        <ArrowBackIcon />
      </div>
      <ul>
        <li onClick={() => navigate("/gerenciar-quadras")}>
          <SportsIcon />
          Gerenciar Quadras
        </li>
        <li onClick={() => navigate("/listar-agendamentos")}>
          <PlaylistAddCheckIcon />
          Listar Agendamentos
        </li>
      </ul>
    </div>
  );
};

export default MenuLateral;
