import {
  IGetUpcomingMoviesResult,
  IGetMoviesResult,
  IGetPopularMoviesResult,
  IGetTopRatedMoviesResult,
  IGetAiringTodayTvResult,
  IGetPopularTvResult,
  IGetCurrentOnAirTvResult,
  IGetMostNewlyTvResult,
  IGetMovieKeywordSearchResult,
  IGetTvKeywordSearchResult,
  IGetTvGenre,
  IGetMovieGenre,
} from '../api';

export const API_KEY = '9d9e113697aea324490c0ee7b9da45dd';
export const BASE_PATH = 'https://api.themoviedb.org/3';
export const GET_PAGE = 1;

// Add Me : if create new Silder , Add key name
export enum SLIDER_TYPES {
  NOW_PLAYING_MOVIE = 'NPM',
  POPULAR_MOVIE = 'PM',
  TOP_RATED_MOVIE = 'TRM',
  LATEST_MOVIE = 'LM',
  UPCOMING_MOVIE = 'UM',
  AIRING_TODAY_TV = 'ATT',
  POPULAR_TV = 'PT',
  CURRENT_ON_AIR_TV = 'COAT',
  MOST_NEWLY_TV = 'MNT',
}

export const enum SLIDER_TITLE {
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

export const enum SEARCH_RESULT_TITLE {
  MOVIE_RESULT = 'Search Result of Movie',
  TV_RESULT = 'Search Result of Tv',
}

export const enum SCREEN_TYPES {
  TV = 1,
  MOVIES = 2,
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

// Add Me : if create new interface type of search result interface type, Add interface name
export type SEARCH_RESULT_INTERFACE_TYPES =
  | IGetMovieKeywordSearchResult
  | IGetTvKeywordSearchResult;

// Add Me : if create new interface type of search result interface type, Add interface name
export type GENRES_LIST_INTERFACE_TYPES = IGetTvGenre | IGetMovieGenre;

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
  MOST_NEWLY = 'most_newly',
  GENRES = 'genres',
}
