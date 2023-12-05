import React, { useState } from 'react';
import styled from 'styled-components';
import { IGetAiringTodayTvResult, getAiringTodayTv, getTvGenreList } from '../api';
import Banner from '../Components/Banner';
import { useQuery } from 'react-query';
import {
  GENRES_LIST_INTERFACE_TYPES,
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
  // fetch data for TV shows airing today.
  const { data, isLoading } = useQuery<IGetAiringTodayTvResult>(
    [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.AIRING_TODAY],
    // The getAiringTodayTv function is the query function responsible for fetching the data.
    getAiringTodayTv,
  );
  const [isBoxPopUp, isSetBoxPopUp] = useState(false);
  const [screenId, setScreenId] = useState<string>();
  // Use the useQuery hook to fetch TV genre list
  useQuery<GENRES_LIST_INTERFACE_TYPES>(
    [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.GENRES],
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
              isSetBoxPopUp={isSetBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.POPULAR_TV}
              screenType={SCREEN_TYPES.TV}
              isSetBoxPopUp={isSetBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
            />
          </SliderArea>
          <SliderArea>
            <Slider
              sliderType={SLIDER_TYPES.CURRENT_ON_AIR_TV}
              screenType={SCREEN_TYPES.TV}
              isSetBoxPopUp={isSetBoxPopUp}
              setScreenId={setScreenId}
              screenId={screenId}
            />
          </SliderArea>
          {isBoxPopUp ? (
            <>
              <Popup
                screenType={SCREEN_TYPES.TV}
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
export default Tv;
