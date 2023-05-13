import React from 'react';
import styled from 'styled-components';
import { IGetAiringTodayTvResult, getAiringTodayTv } from '../api';
import Banner from '../Components/Banner';
import { useQuery } from 'react-query';
import { SCREEN_QUERY_KEY, SLIDER_TYPES } from '../Constants/Common';
import Slider from '../Components/Slider';

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

function Tv(): JSX.Element {
  const { data, isLoading } = useQuery<IGetAiringTodayTvResult>(
    [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.AIRING_TODAY],
    getAiringTodayTv,
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            backgroundImagePath={data?.results[0].backdrop_path}
            title={data?.results[0].name}
            overview={data?.results[0].overview}
          />
          <SliderArea>
            <Slider movieListStyle={SLIDER_TYPES.AIRING_TODAY_TV} />
          </SliderArea>
          <SliderArea>
            <Slider movieListStyle={SLIDER_TYPES.POPULAR_TV} />
          </SliderArea>
          <SliderArea>
            <Slider movieListStyle={SLIDER_TYPES.CURRENT_ON_AIR_TV} />
          </SliderArea>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
