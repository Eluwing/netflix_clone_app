import { API_KEY, BASE_PATH, GET_PAGE } from './Constants/Common';

export interface IMovieOrTv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
}

interface IMovieSearchResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: string;
  vote_average: number;
  vote_count: number;
}

interface ITvSearchResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  origin_country: [];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
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

export interface IGetMovieKeywordSearchResult {
  page: number;
  results: IMovieSearchResult[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvKeywordSearchResult {
  page: number;
  results: ITvSearchResult[];
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

// Keyword Search API
export async function getMovieKeywordSearch(
  keyword: string | null,
): Promise<IGetMovieKeywordSearchResult> {
  return await fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${
      keyword ?? ''
    }&include_adult=false&language=en-US&page=1`,
  ).then(async (response) => await response.json());
}

export async function getTvKeywordSearch(
  keyword: string | null,
): Promise<IGetTvKeywordSearchResult> {
  return await fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${
      keyword ?? ''
    }&include_adult=false&language=en-US&page=1`,
  ).then(async (response) => await response.json());
}
