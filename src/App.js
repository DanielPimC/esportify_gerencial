import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GerenciarQuadras from './components/GerenciarQuadras';
import CriarQuadra from './components/CriarQuadra';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<GerenciarQuadras />} />
          <Route path="/criar-quadra" element={<CriarQuadra />} /> {/* Rota para o formulário de criar quadras */}
        </Routes>
    </Router>
  );
}

export default App;
