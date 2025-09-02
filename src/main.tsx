import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import { LoginPage } from './pages/login.tsx';
import { SignUpPage } from './pages/sign-up.tsx';
import { NotFound } from './pages/not-found.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Home } from './pages/home.tsx';
import { Favorites } from './pages/favorites.tsx';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/providers/auth.provider.tsx';
import { ThemeProvider } from './providers/theme-provider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
    <Toaster richColors />
  </StrictMode>
);
