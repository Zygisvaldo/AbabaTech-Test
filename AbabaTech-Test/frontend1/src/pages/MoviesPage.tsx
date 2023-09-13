import React, { useState, useEffect, useContext } from 'react';
import MovieTable from '../components/MovieComponents/MovieTable'
import CircularProgress from '@mui/material/CircularProgress';
import { fetchAllMovies } from '../services/api';
import { Movie } from '../types';
import SimpleContainer from '../components/Shared/PageContainer'
import CreateMovieButton from '../components/MovieComponents/CreateMovieButton';
import { AuthContext } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData  = await fetchAllMovies();
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <SimpleContainer>
      {isAuthenticated ? (
        <>
        <div style={{ marginBottom: '20px' }}>
          <CreateMovieButton onCreate={(newMovie) => console.log('Created movie:', newMovie)} />
        </div>
      </>
      ) : (
        <h1 style={{
          color: 'white'
        }}>Please log in to use CRUD for movies.</h1>
      )}
      
      {loading ? (
      <CircularProgress />
      ) : (
        <MovieTable movies={movies} />
      )}
    </SimpleContainer>
  );
};

export default HomePage;
