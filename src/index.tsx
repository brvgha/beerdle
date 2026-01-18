import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import './styles/App.css'
import React from 'react'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import SiteHeader from './components/siteHeader';
import BeerdleContextProvider from './context/beerdleContext';
import AboutPage from './pages/aboutPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomePage from './pages/homePage';
import RecommendationPage from './pages/recommendationPage';
import { getSession, healthCheck } from './api/beerdle-api';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import ErrorTemplate from './components/errorTemplate';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  useEffect(() => {
    const initSession = async () => {
      try {
        await healthCheck();
        console.log("Session initialized");
        if (!sessionStorage.getItem('beerdle_session')) {
          const session = await getSession();
          sessionStorage.setItem('beerdle_session', session.sessionToken);
          sessionStorage.setItem('last_played', new Date().toISOString());
        }

        if (sessionStorage.getItem('last_played')) {
          const lastPlayed = new Date(sessionStorage.getItem('last_played') || '');
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - lastPlayed.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays >= 1) {
            sessionStorage.setItem('last_played', new Date().toISOString());
          }
        }


        setIsAuthorized(true);
      } catch (e) {
        console.error("Failed to initialize session", e);
      }
    };
    initSession();
  }, []);

  if (!isAuthorized) {
    return (
      <Grid>
        <ErrorTemplate error="Failed to initialize session, please try again later" />
      </Grid>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <BeerdleContextProvider>
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/recommendation" element={<RecommendationPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BeerdleContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
