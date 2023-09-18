import React, { useState, useEffect, useContext } from 'react';
import MovieTable from '../components/MovieComponents/MovieTable'
import CircularProgress from '@mui/material/CircularProgress';
import { fetchAllMovies } from '../services/api';
import { Movie } from '../types';
import SimpleContainer from '../components/Shared/PageContainer'
import CreateMovieButton from '../containers/MovieCreationHandler';
import { AuthContext } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [orderBy, setOrderBy] = useState<string>('title');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOrderChange = (newOrder: 'ASC' | 'DESC') => {
    setOrder(newOrder);
  };

  const handleOrderByChange = (newOrderBy: string) => {
    setOrderBy(newOrderBy);
  };

  const handleSearchQueryChange = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Query parameters:', { order, orderBy, searchQuery });
        const moviesData  = await fetchAllMovies({ order, orderBy, searchQuery });
        setMovies(moviesData);
        console.log('Movies updated:', moviesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [order, orderBy, searchQuery]);

  return (
    <SimpleContainer>
      {isAuthenticated ? (
        <>
        <div style={{ marginBottom: '20px' }}>
          <CreateMovieButton />
        </div>
      </>
      ) : (
        <h1 style={{
          color: 'white'
        }}>Please log in to use CRUD for movies.</h1>
      )}
      <div style={{ marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => handleSearchQueryChange(e.target.value)} 
          />
          <select onChange={(e) => handleOrderByChange(e.target.value)} value={orderBy}>
            <option value="title">Title</option>
            <option value="description">Description</option>
          </select>
          <select onChange={(e) => handleOrderChange(e.target.value as 'ASC' | 'DESC')} value={order}>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>      
      {loading ? (
      <CircularProgress />
      ) : (
        <MovieTable movies={movies} key={JSON.stringify(movies)} />
      )}
    </SimpleContainer>
  );
};

export default HomePage;
