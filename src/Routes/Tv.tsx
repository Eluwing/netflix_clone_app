import React from 'react';
import styled from 'styled-components';
import { IGetAiringTodayTvResult, getAiringTodayTv } from '../api';
import Banner from '../Components/Banner';
import { useQuery } from 'react-query';
import { SCREEN_QUERY_KEY } from '../Constants/Common';

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
  const { data, isLoading } = useQuery<IGetAiringTodayTvResult>(
    [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.CURRENT_ON_AIR],
    getAiringTodayTv,
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Banner
          backgroundImagePath={data?.results[0].backdrop_path}
          title={data?.results[0].name}
          overview={data?.results[0].overview}
        />
      )}
    </Wrapper>
  );
}
export default Tv;
