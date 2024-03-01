import React from 'react';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { PlayIcon, MoreInfoIcon } from '../icon/BannerIcons';

const BannerArea = styled.div<{ bgphoto: string }>`
  height: 100%;
  display: flex;
  padding: 0px 60px 60px 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  min-height: 500px;
`;

const DetailContentsArea = styled.div`
  padding: 1rem;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  top: 50%;
  &:first-child {
    margin-right: 50px;
  }
`;

const ButtonItem = styled.div`
  margin-left: 10px;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  position: relative;
  top: 50%;
`;

interface IBannerProps {
  backgroundImagePath: string | undefined;
  title: string | undefined;
  overview: string | undefined;
}

/**
 * Banner component for displaying a banner with background image, title, and overview.
 * @param {string} backgroundImagePath - The path to the background image file.
 * @param {string} title - The title to be displayed on the banner.
 * @param {string} overview - The overview or description to be displayed on the banner.
 * @returns {JSX.Element} - Banner component.
 */
function Banner({ backgroundImagePath, title, overview }: IBannerProps): JSX.Element {
  return (
    <>
      {/* Banner area with background image */}
      <BannerArea bgphoto={makeImagePath(backgroundImagePath ?? '')}>
        <DetailContentsArea>
          <Title>{title}</Title>
          <ButtonArea>
            <ButtonItem>
              <PlayIcon />
            </ButtonItem>
            <ButtonItem>
              <MoreInfoIcon />
            </ButtonItem>
          </ButtonArea>
        </DetailContentsArea>
      </BannerArea>
    </>
  );
}
export default Banner;
