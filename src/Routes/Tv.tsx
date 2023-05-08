import React from 'react';
import styled from 'styled-components';
import { IGetMoviesResult } from '../api';
import Banner from '../Components/Banner';

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Tv(): JSX.Element {
  const data: IGetMoviesResult = {
    dates: {
      maximum: '',
      minimum: '',
    },
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  };
  const isLoading = true;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Banner
          backgroundImagePath={data?.results[0].backdrop_path}
          title={data?.results[0].title}
          overview={data?.results[0].overview}
        />
      )}
    </Wrapper>
  );
}
export default Tv;
