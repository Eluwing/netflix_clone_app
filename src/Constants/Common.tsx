import {
  IGetUpcomingMoviesResult,
  IGetMoviesResult,
  IGetPopularMoviesResult,
  IGetTopRatedMoviesResult,
  IGetAiringTodayTvResult,
  IGetPopularTvResult,
  IGetCurrentOnAirTvResult,
  IGetMostNewlyTvResult,
} from '../api';

export const API_KEY = '9d9e113697aea324490c0ee7b9da45dd';
export const BASE_PATH = 'https://api.themoviedb.org/3';
export const GET_PAGE = 1;

// Add Me : if create new Silder , Add key name
export const enum SCREEN_TYPES {
  NOW_PLAYING_MOVIE = 'New Movies in Theaters',
  POPULAR_MOVIE = 'Popular Movies',
  TOP_RATED_MOVIE = 'Top Rated Movies',
  LATEST_MOVIE = 'Latest Moives',
  UPCOMING_MOVIE = 'Upcoming Moives',
  AIRING_TODAY_TV = 'Airing Today Tv Shows',
  POPULAR_TV = 'Popular Tv Shows',
  CURRENT_ON_AIR_TV = 'Current On Air Tv Shows',
  MOST_NEWLY_TV = 'Most Newly Tv Shows',
}

// Add Me : if create new interface type of API, Add interface name
export type API_INTERFACE_TYPES =
  | IGetMoviesResult
  | IGetPopularMoviesResult
  | IGetTopRatedMoviesResult
  | IGetUpcomingMoviesResult
  | IGetAiringTodayTvResult
  | IGetPopularTvResult
  | IGetCurrentOnAirTvResult
  | IGetMostNewlyTvResult;

// Add Me : if create new useQuery Key type, Add key name
export const enum SCREEN_QUERY_KEY {
  MOVIE = 'movie',
  TV = 'tv',
  NOW_PLAYING = 'now_playing',
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
  LATEST = 'latest',
  UPCOMING = 'upcoming',
  AIRING_TODAY = 'airing_today',
  CURRENT_ON_AIR = 'current_on_air',
}
