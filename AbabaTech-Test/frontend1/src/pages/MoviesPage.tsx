import React, { useState, useEffect, useContext } from 'react';
import MovieTable from '../components/MovieComponents/MovieTable'
import CircularProgress from '@mui/material/CircularProgress';
import { fetchAllMovies } from '../services/api';
import { Movie } from '../types';
import SimpleContainer from '../components/Shared/PageContainer'
import CreateMovieButton from '../containers/MovieCreationHandler';
import { AuthContext } from '../contexts/AuthContext';
import { TextField, Select, MenuItem, Box } from '@mui/material';

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
        const moviesData  = await fetchAllMovies({ order, orderBy, searchQuery });
        setMovies(moviesData);
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
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ marginBottom: '20px' }}>
        <Select
          sx={{
            backgroundColor: 'white',
            borderRadius: '4px',
            opacity: '0.9',
            minWidth: '120px', // Adjust the width as needed
          }}
          onChange={(e) => handleOrderByChange(e.target.value)}
          value={orderBy.toString()}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="description">Description</MenuItem>
        </Select>
        <Select
          sx={{
            backgroundColor: 'white',
            borderRadius: '4px',
            opacity: '0.9',
            minWidth: '120px', // Adjust the width as needed
          }}
          onChange={(e) => handleOrderChange(e.target.value as 'ASC' | 'DESC')}
          value={order.toString()}
        >
          <MenuItem value="ASC">Ascending</MenuItem>
          <MenuItem value="DESC">Descending</MenuItem>
        </Select>
        <TextField
          label="Search"
          fullWidth
          value={searchQuery}
          onChange={(e) => handleSearchQueryChange(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderRadius: '4px',
            opacity: '0.9',
            minWidth: '200px',
          }}
        />
      </Box>
      {loading ? (
      <CircularProgress />
      ) : (
        <MovieTable movies={movies} />
      )}
    </SimpleContainer>
  );
};

export default HomePage;
