import React from 'react';
import styled from 'styled-components';
import { makeImagePath } from '../utils';

const BannerArea = styled.div<{ bgphoto: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 60px 60px 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  min-height: 500px;
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
  backgroundImagePath: string | undefined;
  title: string | undefined;
  overview: string | undefined;
}

function Banner({ backgroundImagePath, title, overview }: IBannerProps): JSX.Element {
  return (
    <>
      <BannerArea bgphoto={makeImagePath(backgroundImagePath ?? '')}>
        <Title>{title}</Title>
        <OverView>{overview}</OverView>
      </BannerArea>
    </>
  );
}
export default Banner;
