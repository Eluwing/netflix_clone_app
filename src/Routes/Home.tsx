import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovieGenreList, getMovies, IGetMoviesResult } from '../api';
import Slider from '../Components/Slider';
import {
  GENRES_INTERFACE_TYPES,
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
  // Save to data in Cache and data Variable for TV now playing movie list
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.NOW_PLAYING],
    // fetch data for TV now playing movie list
    getMovies,
  );

  // Save to data in Cache for Movie genre list
  useQuery<GENRES_INTERFACE_TYPES>(
    [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.GENRES],
    // fetches data for movie genre list
    getMovieGenreList,
  );
  const [isBoxPopUp, setIsBoxPopUp] = useState(false);
  const [screenId, setScreenId] = useState<string>();
  const [toptenMovieIds, setToptenMovieIds] = useState<Array<number | undefined>>([]);

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
            screenId={screenId}
            setScreenId={setScreenId}
            setIsBoxPopUp={setIsBoxPopUp}
          />
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.NOW_PLAYING_MOVIE}
              screenType={SCREEN_TYPES.MOVIES}
              isBoxPopUp={isBoxPopUp}
              setIsBoxPopUp={setIsBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
              setToptenMovieIds={setToptenMovieIds}
              toptenMovieIds={toptenMovieIds}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.POPULAR_MOVIE}
              screenType={SCREEN_TYPES.MOVIES}
              isBoxPopUp={isBoxPopUp}
              setIsBoxPopUp={setIsBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
              setToptenMovieIds={setToptenMovieIds}
              toptenMovieIds={toptenMovieIds}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.TOP_RATED_MOVIE}
              screenType={SCREEN_TYPES.MOVIES}
              isBoxPopUp={isBoxPopUp}
              setIsBoxPopUp={setIsBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
              setToptenMovieIds={setToptenMovieIds}
              toptenMovieIds={toptenMovieIds}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.UPCOMING_MOVIE}
              screenType={SCREEN_TYPES.MOVIES}
              isBoxPopUp={isBoxPopUp}
              setIsBoxPopUp={setIsBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
              setToptenMovieIds={setToptenMovieIds}
              toptenMovieIds={toptenMovieIds}
            />
          </SliderArea>
          {isBoxPopUp ? (
            <>
              <Popup
                screenType={SCREEN_TYPES.MOVIES}
                screenId={screenId}
                setIsBoxPopUp={setIsBoxPopUp}
                toptenMovieIds={toptenMovieIds}
              />
            </>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
