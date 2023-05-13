import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import Slider from '../Components/Slider';
import { SCREEN_QUERY_KEY, SLIDER_TYPES } from '../Constants/Common';
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

const SliderArea = styled.div`
  padding-bottom: 200px;
  margin: 30px 0px;
`;

function Home(): JSX.Element {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.NOW_PLAYING],
    getMovies,
  );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            backgroundImagePath={data?.results[0].backdrop_path}
            title={data?.results[0].title}
            overview={data?.results[0].overview}
          />
          <SliderArea>
            <Slider movieListStyle={SLIDER_TYPES.NOW_PLAYING_MOVIE} />
          </SliderArea>
          <SliderArea>
            <Slider movieListStyle={SLIDER_TYPES.POPULAR_MOVIE} />
          </SliderArea>
          <SliderArea>
            <Slider movieListStyle={SLIDER_TYPES.TOP_RATED_MOVIE} />
          </SliderArea>
          <SliderArea>
            <Slider movieListStyle={SLIDER_TYPES.UPCOMING_MOVIE} />
          </SliderArea>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
