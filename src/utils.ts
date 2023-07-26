import { SCREEN_QUERY_KEY, SLIDER_TITLE, SLIDER_TYPES } from './Constants/Common';

export function makeImagePath(id?: string, format?: string): string {
  return `https://image.tmdb.org/t/p/${format !== undefined ? format : 'original'}/${id ?? ''}`;
}

// Generator Slider Box Id because avoid duplicate slider box layouts Id
export function getSliderBoxId(screenNum: number | string, sliderAndScreenType: string): string {
  return String(screenNum).concat(sliderAndScreenType);
}

export function getSliderType(screenId: string | undefined, currentMovieId: string): string[] {
  const sliderAndScreenType = screenId?.replace(currentMovieId, '');
  const sliderType = sliderAndScreenType?.slice(0, -1);

  switch (sliderType) {
    case SLIDER_TYPES.NOW_PLAYING_MOVIE:
      return [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.NOW_PLAYING];
    case SLIDER_TYPES.POPULAR_MOVIE:
      return [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.POPULAR];
    case SLIDER_TYPES.TOP_RATED_MOVIE:
      return [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.TOP_RATED];
    case SLIDER_TYPES.UPCOMING_MOVIE:
      return [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.UPCOMING];
    case SLIDER_TYPES.AIRING_TODAY_TV:
      return [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.AIRING_TODAY];
    case SLIDER_TYPES.POPULAR_TV:
      return [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.POPULAR];
    case SLIDER_TYPES.CURRENT_ON_AIR_TV:
      return [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.CURRENT_ON_AIR];
    case SLIDER_TYPES.MOST_NEWLY_TV:
      return [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.UPCOMING];
    default:
      return ['', ''];
  }
}

export function getSlidersTitle(sliderType: string): string {
  return sliderType === SLIDER_TYPES.NOW_PLAYING_MOVIE
    ? SLIDER_TITLE.NOW_PLAYING_MOVIE
    : sliderType === SLIDER_TYPES.POPULAR_MOVIE
    ? SLIDER_TITLE.POPULAR_MOVIE
    : sliderType === SLIDER_TYPES.TOP_RATED_MOVIE
    ? SLIDER_TITLE.TOP_RATED_MOVIE
    : sliderType === SLIDER_TYPES.LATEST_MOVIE
    ? SLIDER_TITLE.LATEST_MOVIE
    : sliderType === SLIDER_TYPES.UPCOMING_MOVIE
    ? SLIDER_TITLE.UPCOMING_MOVIE
    : sliderType === SLIDER_TYPES.AIRING_TODAY_TV
    ? SLIDER_TITLE.AIRING_TODAY_TV
    : sliderType === SLIDER_TYPES.POPULAR_TV
    ? SLIDER_TITLE.POPULAR_TV
    : sliderType === SLIDER_TYPES.CURRENT_ON_AIR_TV
    ? SLIDER_TITLE.CURRENT_ON_AIR_TV
    : sliderType === SLIDER_TYPES.MOST_NEWLY_TV
    ? SLIDER_TITLE.MOST_NEWLY_TV
    : '';
}
