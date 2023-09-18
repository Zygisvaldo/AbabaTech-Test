import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieComponents/MovieCard';
import { fetchMovieById } from '../services/api';

interface Movie {
  id: number;
  title: string;
  description: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await fetchMovieById(Number(id));
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="textBlock">
      <MovieCard movie={movie} />
    </div>
  );
};

export default MovieDetails;
