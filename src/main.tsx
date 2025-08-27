import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
// import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { LoginPage } from './pages/login.tsx';
import { SignUpPage } from './pages/sign-up.tsx';
import { NotFound } from './pages/not-found.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Test } from './pages/test.tsx';
import { Home } from './pages/home.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
