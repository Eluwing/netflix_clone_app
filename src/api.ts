const API_KEY = '9d9e113697aea324490c0ee7b9da45dd';
const BASE_PATH = 'https://api.themoviedb.org/3';

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

export type API_INTERFACE_TYPE = IGetMoviesResult | IGetPopularMoviesResult;

export async function getMovies(): Promise<IGetMoviesResult> {
  return await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    async (response) => await response.json(),
  );
}

export async function getListTypeMovies(listTypeUrl: string): Promise<IGetPopularMoviesResult> {
  return await fetch(`${BASE_PATH}/movie/${listTypeUrl}?api_key=${API_KEY}`).then(
    async (response) => await response.json(),
  );
}
