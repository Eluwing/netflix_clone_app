import React, { useState } from 'react';
import { IGetMovieKeywordSearchResult, IGetTvKeywordSearchResult } from '../api';

interface SearchResultProps {
  screenType: number;
}

function SearchResult({ screenType }: SearchResultProps): JSX.Element {
  const [data, setData] = useState<IGetTvKeywordSearchResult | IGetMovieKeywordSearchResult>();

  // useEffect(()=>{

  // },[data]);
  return (
    <>
      <div>{'ScreenSearch Component'}</div>
    </>
  );
}
export default SearchResult;
