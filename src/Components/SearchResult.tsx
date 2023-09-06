import React, { useEffect, useState } from 'react';
import {
  IGetMovieKeywordSearchResult,
  IGetTvKeywordSearchResult,
  getMovieKeywordSearch,
  getTvKeywordSearch,
} from '../api';
import { SCREEN_TYPES } from '../Constants/Common';

interface SearchResultProps {
  keyword: string;
  screenType: number;
}

function SearchResult({ keyword, screenType }: SearchResultProps): JSX.Element {
  const [data, setData] =
    useState<Promise<IGetTvKeywordSearchResult | IGetMovieKeywordSearchResult>>();

  switch (screenType) {
    case SCREEN_TYPES.TV:
      useEffect(() => {
        setData(async () => {
          return await getTvKeywordSearch(keyword);
        });
      }, [data]);
    // eslint-disable-next-line no-fallthrough
    case SCREEN_TYPES.MOVIES:
      useEffect(() => {
        setData(async () => {
          return await getMovieKeywordSearch(keyword);
        });
      }, [data]);
    // eslint-disable-next-line no-fallthrough
    default:
  }

  return (
    <>
      <div>{'ScreenSearch Component'}</div>
    </>
  );
}
export default SearchResult;
