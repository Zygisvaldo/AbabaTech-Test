import axios from 'axios';
import { Movie } from '../types';
import { ROUTES } from '../Routes';

const baseURL = 'http://localhost:3000';

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const fetchAllMovies = async (queryParams?: { order?: string, orderBy?: string, searchQuery?: string }): Promise<Movie[]> => {
  try {
    const response = await axios.get<Movie[]>(`${baseURL}${ROUTES.MOVIES}`, { 
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieById = async (movieId: number): Promise<Movie> => {
  try {
    const response = await axios.get<Movie>(`${baseURL}${ROUTES.MOVIE_DETAILS.replace(':id', movieId.toString())}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie ${movieId}:`, error);
    throw error;
  }
};

export const deleteMovieById = async (movieId: number): Promise<void> => {
  try {
    const token = getToken();
    await axios.delete(`${baseURL}${ROUTES.MOVIE_DETAILS.replace(':id', movieId.toString())}`, {
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
    await axios.put(`${baseURL}${ROUTES.MOVIE_DETAILS.replace(':id', movieId.toString())}`, body, {
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
    await axios.post(`${baseURL}${ROUTES.MOVIES}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Error creating movie:`, error);
    throw error;
  }
};

export const loginService = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}${ROUTES.LOG_IN}`, { username, password });
    return response
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const registerService = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}${ROUTES.SIGN_UP}`, { username, password });
    return response
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};