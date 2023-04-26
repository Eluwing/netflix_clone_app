import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import Slider from '../Components/Slider';
import { SCREEN_KEY_TYPES, SCREEN_TYPES } from '../Constants/Common';

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
  margin: 30px 0px;
`;

function Home(): JSX.Element {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    [SCREEN_KEY_TYPES.MOVIE, SCREEN_KEY_TYPES.NOW_PLAYING],
    getMovies,
  );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path ?? '')}>
            <Title>{data?.results[0].title}</Title>
            <OverView>{data?.results[0].overview}</OverView>
          </Banner>
          <SliderArea>
            <Slider movieListStyle={SCREEN_TYPES.NOW_PLAYING_MOVIE} />
            <Slider movieListStyle={SCREEN_TYPES.POPULAR_MOVIE} />
          </SliderArea>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
