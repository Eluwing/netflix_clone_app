import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_INTERFACE_TYPES, SCREEN_TYPES } from '../Constants/Common';
import { useHistory } from 'react-router-dom';
import { getSliderTypeKey, makeImagePath } from '../utils';
import { IMovieOrTv } from '../api';
import { useQueryClient } from 'react-query';

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

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface useQueryType<TInterface> {
  data: TInterface | undefined;
  isLoading: boolean;
}

interface IPopupProps {
  screenType: number;
  screenId: string | undefined;
  isSetBoxPopUp: Dispatch<SetStateAction<boolean>>;
}

function Popup({ screenType, screenId, isSetBoxPopUp }: IPopupProps): JSX.Element {
  const history = useHistory();
  const { scrollY } = useScroll();
  const [currentScrollY, setCurrentScrollY] = useState<number>(0);
  /**
   * Toggles the box popup state.
   */
  const toggleBox = (): void => isSetBoxPopUp((prev) => !prev);
  const queryClient = useQueryClient();
  const [clickedScreen, setClickedScreen] = useState<IMovieOrTv | null>();
  /**
   * State hook for managing the query key set for display to data.
   */
  const [queryKeySet, setQueryKeySet] = useState<string[]>(['', '']);
  // Save to data in Cache and data Variable for seleted screen
  const { data, isLoading }: useQueryType<API_INTERFACE_TYPES> = {
    data: queryClient.getQueryData([queryKeySet[0], queryKeySet[1]]),
    isLoading: false,
  };
  /**
   * Handles overlay click event and navigates based on the screen type.
   */
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

  // Updates the clicked screen data when the data changes.
  useEffect(() => {
    setClickedScreen(
      data?.results.find((movie: { id: number }) => screenId?.includes(String(movie.id))),
    );
  }, [data]);

  // Sets the query key set based on the slider type and screen ID.
  useEffect(() => {
    setQueryKeySet(getSliderTypeKey(screenId));
  }, [screenId]);

  // Listens to the scrollY motion value and updates the current scroll position.
  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    setCurrentScrollY(latest + 20);
  });
  return (
    <>
      <AnimatePresence>
        <Overlay onClick={onOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
        <PopUpArea style={{ top: currentScrollY }} layoutId={screenId}>
          {isLoading ? (
            <Loader>Loading...</Loader>
          ) : (
            <>
              <PopUpCover
                style={{
                  backgroundImage: `linear-gradient(to top,black, transparent), url(${makeImagePath(
                    clickedScreen?.backdrop_path,
                    'w500',
                  )})`,
                }}
              ></PopUpCover>
              <PopUpTitle>
                {(clickedScreen?.title && clickedScreen.title) ??
                  (clickedScreen?.name && clickedScreen.name)}
              </PopUpTitle>
              <PopUpOverview>{clickedScreen?.overview}</PopUpOverview>
            </>
          )}
        </PopUpArea>
      </AnimatePresence>
    </>
  );
}
export default Popup;
