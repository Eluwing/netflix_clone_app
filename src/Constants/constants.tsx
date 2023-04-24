import { IGetMoviesResult, IGetPopularMoviesResult } from '../api';

export enum SCREEN_TYPES {
  NOW_PLAYING_MOVIE = 'now_Playing',
  POPULAR_MOVIE = 'popular',
}
export type API_INTERFACE_TYPES = IGetMoviesResult | IGetPopularMoviesResult;
