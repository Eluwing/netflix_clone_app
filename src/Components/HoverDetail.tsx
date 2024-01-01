/* eslint-disable array-callback-return */
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DetailIcon, PlayIcon, PlusIcon } from '../icon/HoverIcons';
import { getSliderTypeKey, getVideoQualityTitle } from '../utils';
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

const VideoCover = styled(motion.video)`
  height: auto;
  border-radius: 10px 10px 0 0;
  max-width: 100%;
`;

const VideoPlayTools = styled(motion.div)``;

const ButtonArea = styled(motion.div)`
  padding: 1rem;
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
  width: 36px;
  height: 36px;
  fill: currentColor;

  &:hover {
    background: white;
    .card__icon {
      fill: #141414;
    }
  }
`;

const Wapper = styled.div`
  background-color: #1c1c1c;
  border-radius: 0 0 15px 15px;
`;

const DetailButton = styled(CommonButton)``;

const VideoDetail = styled.div`
  padding: 0rem 1rem 1rem 1rem;
  font-size: 10px;
`;

const TopPannel = styled.div`
  display: flex;
  margin-bottom: 5px;
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

interface useQueryType<TInterface> {
  data: TInterface | undefined;
  isLoading: boolean;
}

interface GenreQueryType<TInterface> {
  genreData: TInterface | undefined;
  genreIsLoading: boolean;
}

interface HoverDetailProps {
  backdropMoviePath: string;
  sliderBoxId: string | undefined; // the Box key id in slider component
  isBoxPopUp: SetStateAction<boolean>;
  isSetBoxPopUp: Dispatch<SetStateAction<boolean>>;
  setScreenId: Dispatch<SetStateAction<string | undefined>>;
  screenId: string | undefined;
  screenType: number;
}

/**
 * HoverDetail component for displaying hover details,
 * including video playback and additional information.
 * @param {string} backdropMoviePath - The path to the backdrop video file.
 * @returns {JSX.Element} - HoverDetail component.
 */
function HoverDetail({
  backdropMoviePath,
  sliderBoxId,
  isBoxPopUp,
  isSetBoxPopUp,
  setScreenId,
  screenId,
  screenType,
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
   * Generates a random string value within a specified range.
   * @param {number} min - The minimum value of the range.
   * @param {number} max - The maximum value of the range.
   * @returns {string} - A randomly generated string within the specified range.
   */
  const getRandVal = (min: number, max: number): string => {
    const calMin = min;
    const calMax = max - min + 1;
    const calRand = String(Math.floor(Math.random() * calMax) + calMin);
    return calRand;
  };
  /**
   * Toggles the box popup state.
   */
  const toggleBox = (): void => isSetBoxPopUp((prev) => !prev);

  /**
   * Handles box click event.
   * @param {string} screenId - The screen ID.
   */
  const onBoxClicked = (screenId: string | undefined): void => {
    if (!screenId) {
      return;
    }
    toggleBox();
    setScreenId(screenId);
    if (screenType === SCREEN_TYPES.MOVIES) {
      history.push(`/movies/${screenId}`);
    } else if (screenType === SCREEN_TYPES.TV) {
      history.push(`/tv/${screenId}`);
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    // Sets the query key set based on the Box key id in slider component
    setQueryKeySet(getSliderTypeKey(sliderBoxId));
    // Updates the hovered screen detail data when the screend id changes.
    setHoveredScreen(
      data?.results.find((movie: { id: number }) => sliderBoxId?.includes(String(movie.id))),
    );
  }, [sliderBoxId]);

  // if get Match and Video Quality data for API, delete this code
  useEffect(() => {
    setMatchRandNum(getRandVal(90, 100));
    setVideoQuality(getVideoQualityTitle(Number(getRandVal(0, 5))));
  }, [isBoxPopUp === true]);
  return (
    <Wapper>
      {isLoading ? (
        <Loading isLoading={isLoading} loadingText={'Data Loading...'} />
      ) : (
        <>
          {/* If want get Video to URL */}
          {/* <VideoCover
            ref={videoRef}
            onMouseOver={async () => await playMoive()}
            onMouseOut={async () => await stopMovie()}
            src="https://s3.amazonaws.com/codecademy-content/courses/React/react_video-cute.mp4"
          /> */}
          {/* If want get Video to public folder */}
          <VideoCover
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
          </VideoCover>
          <ButtonArea>
            <VideoPlayTools>
              <CommonButton>
                <PlayIcon />
              </CommonButton>
              <CommonButton>
                <PlusIcon />
              </CommonButton>
            </VideoPlayTools>
            <DetailButton onClick={() => onBoxClicked(screenId)}>
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
        </>
      )}
    </Wapper>
  );
}
export default HoverDetail;
