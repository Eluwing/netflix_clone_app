import { IGetMoviesResult, IGetPopularMoviesResult } from '../api';

export const API_KEY = '9d9e113697aea324490c0ee7b9da45dd';
export const BASE_PATH = 'https://api.themoviedb.org/3';

export const enum SCREEN_TYPES {
  NOW_PLAYING_MOVIE = 'now_playing_movie',
  POPULAR_MOVIE = 'popular_movie',
}
export type API_INTERFACE_TYPES = IGetMoviesResult | IGetPopularMoviesResult;

export const enum SCREEN_KEY_TYPES {
  MOVIE = 'movie',
  TV = 'tv',
  NOW_PLAYING = 'now_playing',
  POPULAR = 'popular',
}
