import axios from 'axios';
import { Movie } from '../types';

const baseURL = 'http://localhost:3000';

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const fetchAllMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get<Movie[]>(`${baseURL}/movies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const deleteMovieById = async (movieId: number): Promise<void> => {
  try {
    const token = getToken();
    await axios.delete(`${baseURL}/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Error deleting movie with ID ${movieId}:`, error);
    throw error;
  }
};

export const updateMovieById = async (movieId: number, updatedMovie: Movie):
Promise<void> => {
  const { title, description } = {...updatedMovie}
  const body = { title, description }
  try {
    const token = getToken();
    await axios.put(`${baseURL}/movies/${movieId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Error updating movie with ID ${movieId}:`, error);
    throw error;
  }
};

export const createMovie = async (updatedMovie: Movie):
Promise<void> => {
  const { title, description } = {...updatedMovie}
  const body = { title, description }
  try {
    const token = getToken();
    await axios.post(`${baseURL}/movies/`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Error creating movie:`, error);
    throw error;
  }
};