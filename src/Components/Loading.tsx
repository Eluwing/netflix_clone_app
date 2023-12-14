import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchResult from '../Components/SearchResult';
import { SCREEN_TYPES } from '../Constants/Common';

interface loadingProps {
  isLoading: boolean;
}

function Loading({ isLoading }: loadingProps): JSX.Element {
  const location = useLocation();
  // Extracts the 'keyword' parameter from the current URL's query string.
  const keyword = new URLSearchParams(location.search).get('keyword');
  return (
    <>
      <SearchResult keyword={keyword} screenType={SCREEN_TYPES.TV} />
      <SearchResult keyword={keyword} screenType={SCREEN_TYPES.MOVIES} />
    </>
  );
}
export default Loading;
