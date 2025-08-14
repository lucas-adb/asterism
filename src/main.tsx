import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { LoginPage } from './pages/login.tsx';
import { SignUpPage } from './pages/sign-up.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
