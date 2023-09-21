import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import ResponsiveAppBar from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import { AuthPage } from './pages/AuthPage';
import AuthProvider from './contexts/AuthContext';
import SimpleContainer from './components/Shared/PageContainer'
import { SuccessMessageProvider } from './contexts/SuccessMessageContext';
import SuccessMessageAlert from './components/Shared/SuccessMessageAlert';
import { ROUTES } from './Routes';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <SuccessMessageProvider>
          <div className="App">
            <ResponsiveAppBar />
              <SimpleContainer>
                <SuccessMessageAlert />
                  <Routes>
                    <Route path={ROUTES.HOME} element={<HomePage/>} />
                    <Route path={ROUTES.MOVIES} element={<MoviesPage />} />
                    <Route path={ROUTES.MOVIE_DETAILS} element={<MovieDetailsPage />} />
                    <Route path={ROUTES.AUTH} element={<AuthPage />} />
                  </Routes>
              </SimpleContainer>
            <Footer />
          </div>
        </SuccessMessageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
