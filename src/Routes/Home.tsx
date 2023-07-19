import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult, IMovieOrTv } from '../api';
import Slider from '../Components/Slider';
import { SCREEN_QUERY_KEY, SCREEN_TYPES, SLIDER_TYPES } from '../Constants/Common';
import Banner from '../Components/Banner';
import Popup from '../Components/Popup';
import { AnimatePresence } from 'framer-motion';

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
  const [clickedMovie, setClickedMovie] = useState<IMovieOrTv | null>();
  const [isBoxPopUp, isSetBoxPopUp] = useState(false);

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
              setClickedMovie={setClickedMovie}
              isSetBoxPopUp={isSetBoxPopUp}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.POPULAR_MOVIE}
              screenType={SCREEN_TYPES.MOVIES}
              setClickedMovie={setClickedMovie}
              isSetBoxPopUp={isSetBoxPopUp}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.TOP_RATED_MOVIE}
              screenType={SCREEN_TYPES.MOVIES}
              setClickedMovie={setClickedMovie}
              isSetBoxPopUp={isSetBoxPopUp}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.UPCOMING_MOVIE}
              screenType={SCREEN_TYPES.MOVIES}
              setClickedMovie={setClickedMovie}
              isSetBoxPopUp={isSetBoxPopUp}
            />
          </SliderArea>
          {isBoxPopUp ? (
            <>
              <AnimatePresence>
                <Popup
                  clickedMovie={clickedMovie}
                  sliderType={''}
                  screenType={0}
                  screenId={undefined}
                />
              </AnimatePresence>
            </>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
