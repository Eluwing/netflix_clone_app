import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { PlayIcon, MoreInfoIcon } from '../icon/BannerIcons';
import { SCREEN_TYPES } from '../Constants/Common';
import { useHistory } from 'react-router-dom';

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

const MoreInfoButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 45px;
  background-color: RGB(97, 97, 97, 0.8);
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
const MoreInfoText = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

interface IBannerProps {
  backgroundImagePath: string | undefined;
  title: string | undefined;
  overview: string | undefined;
  sliderType: string;
  screenType: number;
  setIsBoxPopUp: Dispatch<SetStateAction<boolean>>;
  bannerClickdMovieId: number | undefined;
  setClickedMovieId: Dispatch<SetStateAction<string | undefined>>;
  setClickedSliderType: Dispatch<SetStateAction<string | undefined>>;
  screenId: string | undefined;
  setScreenId: Dispatch<SetStateAction<string | undefined>>;
}

/**
 * Banner component for displaying a banner with background image, title, and overview.
 * @param {string} backgroundImagePath - The path to the background image file.
 * @param {string} title - The title to be displayed on the banner.
 * @param {string} overview - The overview or description to be displayed on the banner.
 * @returns {JSX.Element} - Banner component.
 */
function Banner({
  backgroundImagePath,
  title,
  overview,
  sliderType,
  screenType,
  setIsBoxPopUp,
  bannerClickdMovieId,
  setClickedMovieId,
  setClickedSliderType,
  screenId,
  setScreenId,
}: IBannerProps): JSX.Element {
  /**
   * Toggles the box popup state.
   */
  const history = useHistory();
  const toggleBox = (): void => setIsBoxPopUp((prev) => !prev);
  const onMoreInfoClicked = (movieId: string | undefined, sliderType: string | undefined): void => {
    toggleBox();
    setClickedMovieId(movieId);
    setClickedSliderType(sliderType);
    if (screenType === SCREEN_TYPES.MOVIES) {
      history.push(`/movies/${String(movieId)}`);
    } else if (screenType === SCREEN_TYPES.TV) {
      history.push(`/tv/${String(movieId)}`);
    } else {
      history.push('/');
    }
  };

  return (
    <>
      <BannerArea bgphoto={makeImagePath(backgroundImagePath ?? '')}>
        <DetailContentsArea>
          <Title>{title}</Title>
          <ButtonArea>
            <ButtonItem>
              <PlayIcon />
            </ButtonItem>
            <ButtonItem>
              <MoreInfoButton
                onClick={() => onMoreInfoClicked(String(bannerClickdMovieId), sliderType)}
              >
                <MoreInfoIcon />
                <MoreInfoText>More Info</MoreInfoText>
              </MoreInfoButton>
            </ButtonItem>
          </ButtonArea>
        </DetailContentsArea>
      </BannerArea>
    </>
  );
}
export default Banner;
