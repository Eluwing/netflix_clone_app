import React, { useState } from 'react';
import styled from 'styled-components';
import { IGetAiringTodayTvResult, getAiringTodayTv, getTvGenreList } from '../api';
import Banner from '../Components/Banner';
import { useQuery } from 'react-query';
import {
  GENRES_INTERFACE_TYPES,
  SCREEN_QUERY_KEY,
  SCREEN_TYPES,
  SLIDER_TYPES,
} from '../Constants/Common';
import Slider from '../Components/Slider';
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

function Tv(): JSX.Element {
  // Save to data in Cache and data Variable for TV shows airing today list
  const { data, isLoading } = useQuery<IGetAiringTodayTvResult>(
    [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.AIRING_TODAY],
    // fetch data for TV shows airing today list.
    getAiringTodayTv,
  );
  const [isBoxPopUp, isSetBoxPopUp] = useState(false);
  const [screenId, setScreenId] = useState<string>();
  const [toptenMovieIds, setToptenMovieIds] = useState<Array<number | undefined>>([]);
  // Save to data in Cache for TV genre list
  useQuery<GENRES_INTERFACE_TYPES>(
    [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.GENRES],
    // fetch data for TV genre list
    getTvGenreList,
  );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            backgroundImagePath={data?.results[1].backdrop_path}
            title={data?.results[1].name}
            overview={data?.results[1].overview}
          />
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.AIRING_TODAY_TV}
              screenType={SCREEN_TYPES.TV}
              isBoxPopUp={false}
              isSetBoxPopUp={isSetBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
              setToptenMovieIds={setToptenMovieIds}
              toptenMovieIds={toptenMovieIds}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.POPULAR_TV}
              screenType={SCREEN_TYPES.TV}
              isBoxPopUp={false}
              isSetBoxPopUp={isSetBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
              setToptenMovieIds={setToptenMovieIds}
              toptenMovieIds={toptenMovieIds}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.CURRENT_ON_AIR_TV}
              screenType={SCREEN_TYPES.TV}
              isBoxPopUp={false}
              isSetBoxPopUp={isSetBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
              setToptenMovieIds={setToptenMovieIds}
              toptenMovieIds={toptenMovieIds}
            />
          </SliderArea>
          {isBoxPopUp ? (
            <>
              <Popup
                screenType={SCREEN_TYPES.TV}
                screenId={screenId}
                isSetBoxPopUp={isSetBoxPopUp}
                toptenMovieIds={toptenMovieIds}
              />
            </>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
