import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  API_INTERFACE_TYPES,
  GENRES_INTERFACE_TYPES,
  SCREEN_QUERY_KEY,
  SCREEN_TYPES,
} from '../Constants/Common';
import { useHistory } from 'react-router-dom';
import { getRandVal, getSliderTypeKey, getVideoQualityTitle, makeImagePath } from '../utils';
import { IGenres, IMovieOrTv } from '../api';
import { useQueryClient } from 'react-query';
import { LikeIcon, PlayIcon, PlusIcon } from '../icon/PopupIcons';

const PopUpArea = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 90vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  /* background-color: ${(props) => props.theme.black.lighter}; */
  background-color: #141414;
`;

const PopUpCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 60%;
  padding: 0 40px;
`;

const PopUpTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 26px;
  position: relative;
  top: 30%;
  font-weight: 900;
`;

const PopUpMovieInfo = styled.div``;

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

const ButtonArea = styled(motion.div)`
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  position: relative;
  top: 70%;
`;

const MovieInfoArea = styled.div`
  padding: 10px 10px 10px 40px;
`;
const MovieInfoTop = styled.div`
  display: flex;
`;
const MovieInfoBottom = styled.div`
  display: flex;
`;
const MovieInfoItem = styled.div`
  margin-right: 10px;
`;
const MatchItem = styled.div`
  color: green;
  font-weight: bold;
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
const AgeCategoryArea = styled.div`
  border: 0.1px solid gray;
  padding: 1px 2px;
  margin-right: 5px;
`;
const GenreArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const GenreItem = styled.p`
  margin-right: 10px;
`;
const MovieTopRatingArea = styled.div`
  padding: 0 0px 10px 40px;
  display: flex;
`;
const MovieTopRatingItem = styled.div`
  margin-right: 10px;
  font-weight: 900;
  font-size: 20px;
`;

const PopUpOverview = styled.p`
  padding: 0 40px;
  color: ${(props) => props.theme.white.lighter};
`;

const TopTenArea = styled.div`
  width: 28px;
  height: 30px;
  background-color: red;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 900;
  /* padding: 0px 5px 0px 5px; */
  margin-right: 10px;
  /* display: flex;
  justify-content: center; */
  //아래 위 간격 정렬 해야됨
`;

const TopTenBox = styled.div`
  position: relative;
`;

const TopTenItem = styled.div`
  position: absolute;
  max-width: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const TopTenTopText = styled.div`
  font-size: 10px;
  margin-top: 15%;
`;
const TopTenBottomText = styled.div`
  font-size: 14px;
  margin-top: 60%;
`;

interface useQueryType<TInterface> {
  data: TInterface | undefined;
  isLoading: boolean;
}

interface GenreQueryType<TInterface> {
  genreData: TInterface | undefined;
  genreIsLoading: boolean;
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
  const [matchRandNum, setMatchRandNum] = useState<string>();
  const [videoQuality, setVideoQuality] = useState<string>();
  const [yearRandNum, setYearRandNum] = useState<string>();
  const [seasonRandNum, setSeasonRandNum] = useState<string>();
  /**
   * State hook for managing the query key set for display to data.
   */
  const [queryKeySet, setQueryKeySet] = useState<string[]>(['', '']);
  // Save to data in Cache and data Variable for seleted screen
  const { data, isLoading }: useQueryType<API_INTERFACE_TYPES> = {
    data: queryClient.getQueryData([queryKeySet[0], queryKeySet[1]]),
    isLoading: false,
  };
  const { genreData }: GenreQueryType<GENRES_INTERFACE_TYPES> = {
    genreData: queryClient.getQueryData([queryKeySet[0], SCREEN_QUERY_KEY.GENRES]),
    genreIsLoading: false,
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
  const getGenreName = (genreId: number): IGenres | undefined => {
    return genreData?.genres.find((genre: IGenres) => genre.id === genreId);
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

  // if get Match and Video Quality data for API, delete this code
  useEffect(() => {
    setMatchRandNum(getRandVal(90, 100));
    setVideoQuality(getVideoQualityTitle(Number(getRandVal(0, 5))));
    setYearRandNum(getRandVal(2000, 2024));
    setSeasonRandNum(getRandVal(1, 4));
  }, []);
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
              >
                <ButtonArea>
                  <PlayIcon></PlayIcon>
                  <PlusIcon></PlusIcon>
                  <LikeIcon></LikeIcon>
                </ButtonArea>
                <PopUpTitle>
                  {(clickedScreen?.title && clickedScreen.title) ??
                    (clickedScreen?.name && clickedScreen.name)}
                </PopUpTitle>
              </PopUpCover>
              <MovieInfoArea>
                <MovieInfoTop>
                  <MatchItem>{matchRandNum?.concat('% Match')}</MatchItem>
                  <MovieInfoItem>{yearRandNum}</MovieInfoItem>
                  <MovieInfoItem>{seasonRandNum?.concat(' Seasons')}</MovieInfoItem>
                  <VideoQualityArea>
                    {/* Fix me: if get data, Match value for API */}
                    <VideoQualityItem>{videoQuality}</VideoQualityItem>
                  </VideoQualityArea>
                  <MovieInfoItem>sub icon</MovieInfoItem>
                </MovieInfoTop>
                <MovieInfoBottom>
                  <AgeCategoryArea>{clickedScreen?.adult ? '18+' : '15+'}</AgeCategoryArea>
                  <GenreArea>
                    {clickedScreen?.genre_ids.map((genre, idx) => {
                      return <GenreItem key={idx}>{getGenreName(genre)?.name}</GenreItem>;
                    })}
                  </GenreArea>
                </MovieInfoBottom>
              </MovieInfoArea>
              <MovieTopRatingArea>
                <TopTenArea>
                  <TopTenBox>
                    <TopTenItem>
                      <TopTenTopText>TOP</TopTenTopText>
                    </TopTenItem>
                    <TopTenItem>
                      <TopTenBottomText>10</TopTenBottomText>
                    </TopTenItem>
                  </TopTenBox>
                </TopTenArea>
                <MovieTopRatingItem>#2 in Tv Shows Today</MovieTopRatingItem>
              </MovieTopRatingArea>
              <PopUpMovieInfo>
                <PopUpOverview>{clickedScreen?.overview}</PopUpOverview>
              </PopUpMovieInfo>
            </>
          )}
        </PopUpArea>
      </AnimatePresence>
    </>
  );
}
export default Popup;
