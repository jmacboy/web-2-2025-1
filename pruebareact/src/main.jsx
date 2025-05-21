import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import PersonaList from './pages/PersonaList.jsx';
import FormPersona from './pages/FormPersona.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { AppProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonaList />} />
          <Route path="/personas/create" element={<FormPersona />} />
          <Route path="/personas/:id" element={<FormPersona />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
