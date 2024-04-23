import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GerenciarQuadras from './components/GerenciarQuadras';
import CriarQuadra from './components/CriarQuadra';
import ListarAgendamentos from './components/ListarAgendamentos'
import NotFound from './components/NotFound'

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<GerenciarQuadras />} />
          <Route path="/gerenciar-quadras" element={<GerenciarQuadras />} />
          <Route path="/criar-quadra" element={<CriarQuadra />} />
          <Route path="/listar-agendamentos" element={<ListarAgendamentos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
