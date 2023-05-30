import { SLIDER_TITLE, SLIDER_TYPES } from './Constants/Common';

export function makeImagePath(id: string, format?: string): string {
  return `https://image.tmdb.org/t/p/${format !== undefined ? format : 'original'}/${id}`;
}

// Generator Slider Box Id because avoid duplicate slider box layouts Id
export function getSliderBoxId(screenNum: number, sliderAndScreenType: string): string {
  return String(screenNum).concat(sliderAndScreenType);
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
