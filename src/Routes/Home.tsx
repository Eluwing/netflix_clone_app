import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovieGenreList, getMovies, IGetMoviesResult } from '../api';
import Slider from '../Components/Slider';
import {
  GENRES_LIST_INTERFACE_TYPES,
  SCREEN_QUERY_KEY,
  SCREEN_TYPES,
  SLIDER_TYPES,
} from '../Constants/Common';
import Banner from '../Components/Banner';
import Popup from '../Components/Popup';

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
  margin: 30px 0px;
`;

function Home(): JSX.Element {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.NOW_PLAYING],
    getMovies,
  );

  // Use the useQuery hook to fetch movie genre list
  useQuery<GENRES_LIST_INTERFACE_TYPES>(
    [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.GENRES],
    getMovieGenreList,
  );
  const [isBoxPopUp, isSetBoxPopUp] = useState(false);
  const [screenId, setScreenId] = useState<string>();

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
            <Slider
              sliderType={SLIDER_TYPES.NOW_PLAYING_MOVIE}
              screenType={SCREEN_TYPES.MOVIES}
              isSetBoxPopUp={isSetBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.POPULAR_MOVIE}
              screenType={SCREEN_TYPES.MOVIES}
              isSetBoxPopUp={isSetBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.TOP_RATED_MOVIE}
              screenType={SCREEN_TYPES.MOVIES}
              isSetBoxPopUp={isSetBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.UPCOMING_MOVIE}
              screenType={SCREEN_TYPES.MOVIES}
              isSetBoxPopUp={isSetBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
            />
          </SliderArea>
          {isBoxPopUp ? (
            <>
              <Popup
                screenType={SCREEN_TYPES.MOVIES}
                screenId={screenId}
                isSetBoxPopUp={isSetBoxPopUp}
              />
            </>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
