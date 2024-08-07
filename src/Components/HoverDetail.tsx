import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { DetailIcon, PlayIcon, PlusIcon } from '../icon/HoverIcons';
import { getVideoQualityTitle, getRandVal, getSliderQueryKey } from '../utils';
import { useQueryClient } from 'react-query';
import {
  API_INTERFACE_TYPES,
  GENRES_INTERFACE_TYPES,
  SCREEN_QUERY_KEY,
  SCREEN_TYPES,
} from '../Constants/Common';
import { IGenres, IMovieOrTv } from '../api';
import Loading from './Loading';
import { useHistory } from 'react-router-dom';

const VideoCoverArea = styled(motion.video)`
  height: auto;
  border-radius: 10px 10px 0 0;
  max-width: 100%;
`;

const VideoPlayTools = styled(motion.div)``;

const ButtonArea = styled(motion.div)`
  padding: 1rem 1rem 0rem 1rem;
  display: flex;
  justify-content: space-between;
`;
const CommonButton = styled(motion.div)`
  padding: 0.4rem;
  margin-right: 0.4rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 250ms;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  fill: currentColor;

  &:hover {
    background: white;
    .card__icon {
      fill: #141414;
    }
  }
`;

const Wapper = styled.div``;

const DetailButton = styled(CommonButton)``;

const VideoDetail = styled.div`
  padding: 1rem;
  font-size: 10px;
  background-color: #141414;
`;

const TopPannel = styled.div`
  display: flex;
`;

const BottomPannel = styled.div`
  display: flex;
`;

const MatchArea = styled.div`
  color: green;
  font-weight: bold;
  margin-right: 5px;
`;

const GenreArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GenreItem = styled.li`
  margin-right: 10px;
`;

const AgeCategoryArea = styled.div`
  border: 0.1px solid gray;
  padding: 1px 2px;
  margin-right: 5px;
`;

const VideoQualityArea = styled.div`
  display: flex;
  align-items: center;
`;

const VideoQualityItem = styled.div`
  display: flex;
  align-items: center;
  border: 0.1px solid gray;
  border-radius: 3px;
  padding: 1px 5px;
  font-size: 7px;
  margin-right: 5px;
`;

const HoverArea = styled(motion.div)`
  background-color: ${(props) => props.theme.black.veryDark};
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  display: none;
  &:hover {
    border-radius: 10px 10px 0 0;
  }
`;

const HoverVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      type: 'tween',
    },
    display: 'block',
  },
};

const HoverTextOverlay = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: 800;
  font-size: 18px;
  text-align: center;
  /* Ensures the text doesn't interfere with mouse events */
  pointer-events: none;
`;

interface useQueryType<TInterface> {
  data: TInterface | undefined;
  isLoading: boolean;
}

interface GenreQueryType<TInterface> {
  genreData: TInterface | undefined;
  genreIsLoading: boolean;
}

interface HoverDetailProps {
  sliderType: string;
  screenType: number;
  clickedMovieId: SetStateAction<string | undefined>;
  setClickedMovieId: Dispatch<SetStateAction<string | undefined>>;
  setClickedSliderType: Dispatch<SetStateAction<string | undefined>>;
  backdropMoviePath: string;
  setIsBoxPopUp: Dispatch<SetStateAction<boolean>>;
}

/**
 * HoverDetail component for displaying hover details,
 * including video playback and additional information.
 * @param {string} backdropMoviePath - The path to the backdrop video file.
 * @returns {JSX.Element} - HoverDetail component.
 */
function HoverDetail({
  sliderType,
  screenType,
  clickedMovieId,
  setClickedMovieId,
  setClickedSliderType,
  backdropMoviePath,
  setIsBoxPopUp,
}: HoverDetailProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const queryClient = useQueryClient();
  const history = useHistory();
  /**
   * State hook for managing the query key set for display to data.
   */
  const [queryKeySet, setQueryKeySet] = useState<string[]>(['', '']);
  const [hoveredScreen, setHoveredScreen] = useState<IMovieOrTv | null>();
  const [matchRandNum, setMatchRandNum] = useState<string>();
  const [videoQuality, setVideoQuality] = useState<string>();

  // Save to data in Cache and data Variable for seleted screen
  const { data, isLoading }: useQueryType<API_INTERFACE_TYPES> = {
    data: queryClient.getQueryData([queryKeySet[0], queryKeySet[1]]),
    isLoading: false,
  };
  const { genreData }: GenreQueryType<GENRES_INTERFACE_TYPES> = {
    genreData: queryClient.getQueryData([queryKeySet[0], SCREEN_QUERY_KEY.GENRES]),
    genreIsLoading: false,
  };
  // // If want get Video to URL
  // const stopMovie = async (): Promise<void> => {
  //   if (videoRef.current) {
  //     try {
  //       await videoRef.current.pause();
  //     } catch (error) {
  //       throw new Error('Error hover stopMoive component', error || '');
  //     }
  //   }
  // };
  // const playMoive = async (): Promise<void> => {
  //   if (videoRef.current) {
  //     if (videoRef.current) {
  //       try {
  //         await videoRef.current.play();
  //       } catch (error) {
  //         throw new Error('Error hover playMoive component', error || '');
  //       }
  //     }
  //   }
  // If want get Video to public folder
  /**
   * Pauses the video playback.
   */
  const stopMovie = (): void => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  /**
   * Initiates video playback.
   */
  const playMoive = (): void => {
    if (videoRef.current) {
      // Add comment Because mute promises error
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      videoRef.current.play();
    }
  };
  const getGenreName = (genreId: number): IGenres | undefined => {
    return genreData?.genres.find((genre: IGenres) => genre.id === genreId);
  };
  /**
   * Toggles the box popup state.
   */
  const toggleBox = (): void => setIsBoxPopUp((prev) => !prev);

  /**
   * Handles the click event for the box.
   * Sets the clicked movie ID and slider type, toggles the box visibility,
   * and redirects to the appropriate screen based on the screen type.
   * @param {React.SetStateAction<string | undefined> | undefined} clickedMovieId - The ID of the clicked movie.
   * @returns {void}
   */
  const onBoxClicked = (clickedMovieId: SetStateAction<string | undefined> | undefined): void => {
    if (!clickedMovieId) {
      return;
    }
    setClickedMovieId(clickedMovieId);
    setClickedSliderType(sliderType);
    toggleBox();
    if (screenType === SCREEN_TYPES.MOVIES) {
      history.push(`/movies/${String(clickedMovieId)}`);
    } else if (screenType === SCREEN_TYPES.TV) {
      history.push(`/tv/${String(clickedMovieId)}`);
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    // Sets the query key set based on the Box key id in slider component
    setQueryKeySet(getSliderQueryKey(sliderType));
    // Updates the hovered screen detail data when the screend id changes.
    setHoveredScreen(
      data?.results.find((movie: { id: number }) => clickedMovieId === String(movie.id)),
    );
  }, [clickedMovieId]);

  // if get Match and Video Quality data for API, delete this code
  useEffect(() => {
    setMatchRandNum(getRandVal(90, 100));
    setVideoQuality(getVideoQualityTitle(Number(getRandVal(0, 5))));
  }, []);
  return (
    <Wapper>
      {isLoading ? (
        <Loading isLoading={isLoading} loadingText={'Data Loading...'} />
      ) : (
        <>
          <AnimatePresence>
            <HoverArea variants={HoverVariants}>
              {/* If want get Video to URL */}
              {/* <VideoCover
            ref={videoRef}
            onMouseOver={async () => await playMoive()}
            onMouseOut={async () => await stopMovie()}
            src="https://s3.amazonaws.com/codecademy-content/courses/React/react_video-cute.mp4"
          /> */}
              {/* If want get Video to public folder */}
              <VideoCoverArea
                ref={videoRef}
                onMouseOver={() => playMoive()}
                onMouseOut={() => stopMovie()}
                muted
              >
                {backdropMoviePath ? (
                  <source src={backdropMoviePath} type="video/mp4" />
                ) : (
                  <source src="videos/sample_hover_video.mp4" type="video/mp4" />
                )}
                Your browser does not support the video tag.
              </VideoCoverArea>
              <HoverTextOverlay>Sample</HoverTextOverlay>
              <ButtonArea>
                <VideoPlayTools>
                  <CommonButton>
                    <PlayIcon />
                  </CommonButton>
                  <CommonButton>
                    <PlusIcon />
                  </CommonButton>
                </VideoPlayTools>
                <DetailButton onClick={() => onBoxClicked(clickedMovieId)}>
                  <DetailIcon />
                </DetailButton>
              </ButtonArea>
              <VideoDetail>
                <TopPannel>
                  {/* Fix me: if get data, Match value for API */}
                  <MatchArea>{matchRandNum?.concat('%Match')}</MatchArea>
                  {/* Fix me: if get data, Match value for API */}
                  <AgeCategoryArea>{hoveredScreen?.adult ? '18+' : '15+'}</AgeCategoryArea>
                  <VideoQualityArea>
                    {/* Fix me: if get data, Match value for API */}
                    <VideoQualityItem>{videoQuality}</VideoQualityItem>
                  </VideoQualityArea>
                </TopPannel>
                <BottomPannel>
                  <GenreArea>
                    {hoveredScreen?.genre_ids.map((genre, idx) => {
                      return <GenreItem key={idx}>{getGenreName(genre)?.name}</GenreItem>;
                    })}
                  </GenreArea>
                </BottomPannel>
              </VideoDetail>
            </HoverArea>
          </AnimatePresence>
        </>
      )}
    </Wapper>
  );
}
export default HoverDetail;
