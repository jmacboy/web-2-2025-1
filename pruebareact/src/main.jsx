import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import PersonaList from './pages/PersonaList.jsx';
import FormPersona from './pages/FormPersona.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PersonaList />} />
        <Route path="/personas/create" element={<FormPersona />} />
        <Route path="/personas/:id" element={<FormPersona />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
