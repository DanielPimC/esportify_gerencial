import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GerenciarQuadras from './components/GerenciarQuadras';
import CriarQuadra from './components/CriarQuadra';
import ListarAgendamentos from './components/ListarAgendamentos'
import NotFound from './components/NotFound'
import GerenciarHorarios from './components/GerenciarHorarios';
import Login from './components/Login';
import Register from './components/Register/Register';

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/gerenciar-quadras" element={<GerenciarQuadras />} />
          <Route path="/gerenciar-horarios" element={<GerenciarHorarios />} />
          <Route path="/criar-quadra" element={<CriarQuadra />} />
          <Route path="/listar-agendamentos" element={<ListarAgendamentos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
