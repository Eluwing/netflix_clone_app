import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchResult from '../Components/SearchResult';
import { SCREEN_TYPES } from '../Constants/Common';

function Search(): JSX.Element {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  return (
    <>
      <SearchResult keyword={keyword} screenType={SCREEN_TYPES.TV} />
      <SearchResult keyword={keyword} screenType={SCREEN_TYPES.MOVIES} />
    </>
  );
}
export default Search;
