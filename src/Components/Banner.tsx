import React from 'react';
import styled from 'styled-components';
import { makeImagePath } from '../utils';

const BannerArea = styled.div<{ bgPhoto: string }>`
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

interface IBannerProps {
  backgroundImagePath: string;
  title: string;
  overview: string;
}

function Banner({ backgroundImagePath, title, overview }: IBannerProps): JSX.Element {
  return (
    <>
      <BannerArea bgPhoto={makeImagePath(backgroundImagePath ?? '')}>
        <Title>{title}</Title>
        <OverView>{overview}</OverView>
      </BannerArea>
    </>
  );
}
export default Banner;
