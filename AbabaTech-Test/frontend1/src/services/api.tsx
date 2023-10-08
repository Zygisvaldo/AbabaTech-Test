import axios, { AxiosError } from "axios";
import { Movie } from "../types";
import { ROUTES } from "../Routes";

const baseURL = "http://localhost:3000";

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const fetchAllMovies = async (queryParams?: {
  order?: string;
  orderBy?: string;
  searchQuery?: string;
}): Promise<Movie[]> => {
  const response = await axios.get<Movie[]>(`${baseURL}${ROUTES.MOVIES}`, {
    params: queryParams,
  });
  return response.data;
};

export const fetchMovieById = async (movieId: number): Promise<Movie> => {
  const response = await axios.get<Movie>(
    `${baseURL}${ROUTES.MOVIE_DETAILS.replace(":id", movieId.toString())}`
  );
  return response.data;
};

export const deleteMovieById = async (movieId: number): Promise<void> => {
  const token = getToken();
  await axios.delete(
    `${baseURL}${ROUTES.MOVIE_DETAILS.replace(":id", movieId.toString())}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateMovieById = async (
  movieId: number,
  updatedMovie: Movie
): Promise<void> => {
  const { title, description } = { ...updatedMovie };
  const body = { title, description };
  const token = getToken();
  await axios.put(
    `${baseURL}${ROUTES.MOVIE_DETAILS.replace(":id", movieId.toString())}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createMovie = async (updatedMovie: Movie): Promise<void> => {
  const { title, description } = { ...updatedMovie };
  const body = { title, description };
  const token = getToken();
  try {
    const res = await axios.post(`${baseURL}${ROUTES.MOVIES}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  } catch (err: any) {
    const errMessage = err.response.data.message
    console.log(err.response.data.message);
    throw new Error(errMessage)
  }
};

export const loginService = async (username: string, password: string) => {
  const response = await axios.post(`${baseURL}${ROUTES.LOG_IN}`, {
    username,
    password,
  });
  return response;
};

export const registerService = async (username: string, password: string) => {
  const response = await axios.post(`${baseURL}${ROUTES.SIGN_UP}`, {
    username,
    password,
  });
  return response;
};
