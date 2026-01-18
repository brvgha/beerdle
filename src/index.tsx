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
        if (!localStorage.getItem('beerdle_session')) {
          const session = await getSession();
          localStorage.setItem('beerdle_session', session.sessionToken);
          localStorage.setItem('last_played', new Date().toISOString());
        }

        if (localStorage.getItem('last_played')) {
          const lastPlayed = new Date(localStorage.getItem('last_played') || '');
          const now = new Date();

          // Reset game if it's a new day (UTC based for consistency)
          const isSameDay =
            now.getUTCFullYear() === lastPlayed.getUTCFullYear() &&
            now.getUTCMonth() === lastPlayed.getUTCMonth() &&
            now.getUTCDate() === lastPlayed.getUTCDate();

          if (!isSameDay) {
            localStorage.removeItem('guesses');
            localStorage.removeItem('guessedBeers');
            localStorage.setItem('last_played', now.toISOString());
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
