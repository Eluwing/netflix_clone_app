import React from 'react';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { IGetMoviesResult } from '../api';

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const OverView = styled.div`
  font-size: 30px;
  width: 50%;
`;

const SliderArea = styled.div`
  padding-bottom: 200px;
  margin: 30px 0px;
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
        <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path ?? '')}>
          <Title>{data?.results[0].title}</Title>
          <OverView>{data?.results[0].overview}</OverView>
        </Banner>
      )}
    </Wrapper>
  );
}
export default Tv;
