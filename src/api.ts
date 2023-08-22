import { API_KEY, BASE_PATH, GET_PAGE } from './Constants/Common';

export interface IMovieOrTv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
}

export interface ISearchResult {
  id: number;
  name: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovieOrTv[];
  total_pages: number;
  total_results: number;
}

export interface IGetPopularMoviesResult {
  page: number;
  results: IMovieOrTv[];
  total_pages: number;
  total_results: number;
}

export interface IGetTopRatedMoviesResult {
  page: number;
  results: IMovieOrTv[];
  total_pages: number;
  total_results: number;
}

export interface IGetUpcomingMoviesResult {
  page: number;
  results: IMovieOrTv[];
  total_pages: number;
  total_results: number;
}

export interface IGetAiringTodayTvResult {
  page: number;
  results: IMovieOrTv[];
  total_pages: number;
  total_results: number;
}

export interface IGetPopularTvResult {
  page: number;
  results: IMovieOrTv[];
  total_pages: number;
  total_results: number;
}

export interface IGetCurrentOnAirTvResult {
  page: number;
  results: IMovieOrTv[];
  total_pages: number;
  total_results: number;
}

export interface IGetMostNewlyTvResult {
  page: number;
  results: IMovieOrTv[];
  total_pages: number;
  total_results: number;
}

export interface IGetKeywordSearchResult {
  page: number;
  results: ISearchResult[];
  total_pages: number;
  total_results: number;
}
// Movie List API
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

// TV List API
export async function getAiringTodayTv(): Promise<IGetAiringTodayTvResult> {
  return await fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&page=${GET_PAGE}`).then(
    async (response) => await response.json(),
  );
}
export async function getPopularTv(): Promise<IGetPopularTvResult> {
  return await fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&page=2`).then(
    async (response) => await response.json(),
  );
}
export async function getCurrentOnAirTv(): Promise<IGetCurrentOnAirTvResult> {
  return await fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&page=3`).then(
    async (response) => await response.json(),
  );
}
export async function getMostNewlyTv(): Promise<IGetMostNewlyTvResult> {
  return await fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}&page=4`).then(
    async (response) => await response.json(),
  );
}

export async function getKeywordSearchResult(keyword: string): Promise<IGetKeywordSearchResult> {
  return await fetch(`${BASE_PATH}/search/keyword?api_key=${API_KEY}&query=${keyword}&page=1`).then(
    async (response) => await response.json(),
  );
}
