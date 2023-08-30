import React from 'react';
import { useLocation } from 'react-router-dom';
import { IGetMovieKeywordSearchResult, getMovieKeywordSearch } from '../api';
import { useQuery } from 'react-query';

function Search(): JSX.Element {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const { data } = useQuery<IGetMovieKeywordSearchResult>(
    ['Search', 'Keyword', 'movie'],
    async () => await getMovieKeywordSearch(String(keyword)),
  );
  return (
    <>
      {data?.results.map((search) => (
        <>{search.title}</>
      ))}
    </>
  );
}
export default Search;
