import React from 'react';
import { useLocation } from 'react-router-dom';

function Search(): JSX.Element {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  console.log({ keyword });
  return <>{null}</>;
}
export default Search;
