import { API_KEY, BASE_PATH, GET_PAGE } from './Constants/Common';

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetPopularMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetTopRatedMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetUpcomingMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getMovies(): Promise<IGetMoviesResult> {
  return await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&page=${GET_PAGE}`).then(
    async (response) => await response.json(),
  );
}

export async function getPopularMovies(): Promise<IGetPopularMoviesResult> {
  return await fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&page=${GET_PAGE}`).then(
    async (response) => await response.json(),
  );
}

export async function getTopRatedMovies(): Promise<IGetTopRatedMoviesResult> {
  return await fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&page=${GET_PAGE}`).then(
    async (response) => await response.json(),
  );
}

export async function getUpcomingMovies(): Promise<IGetUpcomingMoviesResult> {
  return await fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    async (response) => await response.json(),
  );
}
