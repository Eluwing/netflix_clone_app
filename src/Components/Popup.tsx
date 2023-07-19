import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import { SCREEN_TYPES } from '../Constants/Common';
import { useHistory } from 'react-router-dom';
import { makeImagePath } from '../utils';
import { IMovieOrTv } from '../api';

const PopUpArea = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 90vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const PopUpCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const PopUpTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 26px;
  position: relative;
  top: -60px;
`;

const PopUpOverview = styled.p`
  padding: 20px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  top: -60px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

interface IPopupProps {
  sliderType: string;
  screenType: number;
  clickedMovie: IMovieOrTv | undefined | null;
  screenId: string | undefined;
}

function Popup({ sliderType, screenType, clickedMovie, screenId }: IPopupProps): JSX.Element {
  const history = useHistory();
  const { scrollY } = useScroll();
  const [isBoxPopUp, isSetBoxPopUp] = useState(true);
  const popUpScrollY = useTransform(scrollY, (latest) => latest + 20);
  const toggleBox = (): void => isSetBoxPopUp((prev) => !prev);
  const onOverlayClick = (): void => {
    toggleBox();
    if (screenType === SCREEN_TYPES.MOVIES) {
      history.push('/');
    } else if (screenType === SCREEN_TYPES.TV) {
      history.push('/tv');
    } else {
      history.push('/');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isBoxPopUp ? (
          <>
            <Overlay onClick={onOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
            <PopUpArea style={{ top: popUpScrollY }} layoutId={screenId}>
              {clickedMovie && (
                <>
                  <PopUpCover
                    style={{
                      backgroundImage: `linear-gradient(to top,black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path,
                        'w500',
                      )})`,
                    }}
                  ></PopUpCover>
                  <PopUpTitle>
                    {(clickedMovie.title && clickedMovie.title) ??
                      (clickedMovie.name && clickedMovie.name)}
                  </PopUpTitle>
                  <PopUpOverview>{clickedMovie.overview}</PopUpOverview>
                </>
              )}
            </PopUpArea>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
export default Popup;
