import {
  SCREEN_QUERY_KEY,
  SCREEN_TYPES,
  SEARCH_RESULT_TITLE,
  SLIDER_TITLE,
  SLIDER_TYPES,
  VIDEO_QUALITY,
  VIDEO_QUALITY_NAME,
} from './Constants/Common';

export function makeImagePath(id?: string, format?: string): string {
  if (!id) {
    return 'image/not-found-image.jpg';
  } else {
    return `https://image.tmdb.org/t/p/${format !== undefined ? format : 'original'}/${id ?? ''}`;
  }
}

// Generator Slider Box Id because avoid duplicate slider box layouts Id
export function getSliderBoxId(screenNum: number | string, sliderAndScreenType: string): string {
  return String(screenNum).concat(sliderAndScreenType);
}

/**
 * Get the slider type based on the provided screen ID.
 * @param {string | undefined} screenId - The screen ID to determine the slider type.
 * @returns {string} - The slider type corresponding to the screen ID, or an empty string if not found.
 */
function getSliderType(screenId: string | undefined): string {
  const sliderTypeArry: string[] = Object.values(SLIDER_TYPES);
  for (let i = 0; i < sliderTypeArry.length; i++) {
    if (screenId?.includes(sliderTypeArry[i])) {
      return sliderTypeArry[i];
    }
  }
  return '';
}

/**
 * Get the query key array for the given slider type.
 * @param {string | undefined} screenId - The screen ID to determine the slider type.
 * @returns {string[]} - The query key array corresponding to the slider type, or an array with empty strings if not found.
 */
export function getSliderTypeKey(screenId: string | undefined): string[] {
  const sliderType = getSliderType(screenId);

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

/**
 * Get the title for sliders based on the slider type.
 * @param {string} sliderType - The type of the slider.
 * @returns {string} - The title corresponding to the slider type.
 */
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
    : 'Not Defiend';
}

/**
 * Get the title for screens based on the screen type.
 * @param {number} screenType - The type of the screen.
 * @returns {string} - The title corresponding to the screen type.
 */
export function getScreenTitle(screenType: number): string {
  return screenType === SCREEN_TYPES.MOVIES
    ? SEARCH_RESULT_TITLE.MOVIE_RESULT
    : screenType === SCREEN_TYPES.TV
    ? SEARCH_RESULT_TITLE.TV_RESULT
    : 'Not Defiend';
}

export function getVideoQualityTitle(qualityNum: number): string {
  return qualityNum === VIDEO_QUALITY.SD
    ? VIDEO_QUALITY_NAME.SD
    : qualityNum === VIDEO_QUALITY.HD
    ? VIDEO_QUALITY_NAME.HD
    : qualityNum === VIDEO_QUALITY.FHD
    ? VIDEO_QUALITY_NAME.FHD
    : qualityNum === VIDEO_QUALITY.QUAD_HD
    ? VIDEO_QUALITY_NAME.QUAD_HD
    : qualityNum === VIDEO_QUALITY.UHD
    ? VIDEO_QUALITY_NAME.UHD
    : qualityNum === VIDEO_QUALITY.OCTUPLE_HD
    ? VIDEO_QUALITY_NAME.OCTUPLE_HD
    : 'Not Defiend';
}
