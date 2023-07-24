import { AnimatePresence, motion } from 'framer-motion';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import {
  IGetPopularMoviesResult,
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getCurrentOnAirTv,
  getPopularTv,
  getMostNewlyTv,
  IGetTopRatedMoviesResult,
  IGetUpcomingMoviesResult,
  IGetPopularTvResult,
  IGetCurrentOnAirTvResult,
  IMovieOrTv,
} from '../api';
import { match, useHistory, useRouteMatch } from 'react-router-dom';
import { getSliderBoxId, getSlidersTitle, makeImagePath } from '../utils';
import {
  API_INTERFACE_TYPES,
  SCREEN_QUERY_KEY,
  SCREEN_TYPES,
  SLIDER_TYPES,
} from '../Constants/Common';

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const SliderArea = styled.div`
  margin-bottom: 250px;
`;

const SliderTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SliderTitleArea = styled.div`
  font-size: 20px;
  font-weight: 1000;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: end;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      type: 'tween',
    },
  },
};

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const offset = 6;

interface ISliderProps {
  sliderType: string;
  screenType: number;
  setClickedMovie: Dispatch<SetStateAction<IMovieOrTv | null | undefined>>;
  isSetBoxPopUp: Dispatch<SetStateAction<boolean>>;
  setScreenId: Dispatch<SetStateAction<string | undefined>>;
}

interface useQueryType<TInterface> {
  data: TInterface | undefined;
  isLoading: boolean;
}

function Slider({
  sliderType,
  screenType,
  setClickedMovie,
  isSetBoxPopUp,
  setScreenId,
}: ISliderProps): JSX.Element {
  const history = useHistory();
  const sliderAndScreenType = sliderType.concat(String(screenType));
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [, setPopUpMovieMatch] = useState<match<{ screenId: string }> | null>();
  const [screenId] = useState<string>();
  const emptyData: useQueryType<API_INTERFACE_TYPES> = {
    // Because it is not possible to set an empty object in TypeScript
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    data: {} as API_INTERFACE_TYPES,
    isLoading: true,
  };
  const queryClient = useQueryClient();
  const { data, isLoading }: useQueryType<API_INTERFACE_TYPES> =
    sliderType === SLIDER_TYPES.NOW_PLAYING_MOVIE
      ? {
          data: queryClient.getQueryData([SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.NOW_PLAYING]),
          isLoading: false,
        }
      : // Movie List
      sliderType === SLIDER_TYPES.POPULAR_MOVIE
      ? useQuery<IGetPopularMoviesResult>({
          queryKey: [[SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.POPULAR]],
          queryFn: getPopularMovies,
        })
      : sliderType === SLIDER_TYPES.TOP_RATED_MOVIE
      ? useQuery<IGetTopRatedMoviesResult>({
          queryKey: [[SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.TOP_RATED]],
          queryFn: getTopRatedMovies,
        })
      : sliderType === SLIDER_TYPES.UPCOMING_MOVIE
      ? useQuery<IGetUpcomingMoviesResult>({
          queryKey: [[SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.UPCOMING]],
          queryFn: getUpcomingMovies,
        })
      : // TV List
      sliderType === SLIDER_TYPES.AIRING_TODAY_TV
      ? {
          data: queryClient.getQueryData([SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.AIRING_TODAY]),
          isLoading: false,
        }
      : sliderType === SLIDER_TYPES.POPULAR_TV
      ? useQuery<IGetPopularTvResult>({
          queryKey: [[SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.POPULAR]],
          queryFn: getPopularTv,
        })
      : sliderType === SLIDER_TYPES.CURRENT_ON_AIR_TV
      ? useQuery<IGetCurrentOnAirTvResult>({
          queryKey: [[SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.CURRENT_ON_AIR]],
          queryFn: getCurrentOnAirTv,
        })
      : sliderType === SLIDER_TYPES.MOST_NEWLY_TV
      ? useQuery<IGetPopularMoviesResult>({
          queryKey: [[SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.UPCOMING]],
          queryFn: getMostNewlyTv,
        })
      : emptyData;
  const incraseIndex = (): void => {
    if (data != null) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = (): void => {
    if (data != null) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev - 1));
    }
  };
  const toggleLeaving = (): void => setLeaving((prev) => !prev);
  const toggleBox = (): void => isSetBoxPopUp((prev) => !prev);
  const onBoxClicked = (screenId: string): void => {
    toggleBox();
    setScreenId(screenId);
    console.log({ screenId });
    if (screenType === SCREEN_TYPES.MOVIES) {
      history.push(`/movies/${screenId}`);
    } else if (screenType === SCREEN_TYPES.TV) {
      history.push(`/tv/${screenId}`);
    } else {
      history.push('/');
    }
  };
  const slidersTitle = getSlidersTitle(sliderType);
  useEffect(() => {
    if (screenType === SCREEN_TYPES.MOVIES) {
      setPopUpMovieMatch((prev) => useRouteMatch<{ screenId: string }>('/movies/:screenId'));
    } else if (screenType === SCREEN_TYPES.TV) {
      setPopUpMovieMatch((prev) => useRouteMatch<{ screenId: string }>('/tv/:screenId'));
    }
  }, [screenId]);
  useEffect(() => {
    setClickedMovie(
      data?.results.find(
        (movie: { id: number }) => String(movie.id).concat(sliderAndScreenType) === screenId,
      ),
    );
  }, [screenId]);
  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <SliderArea>
            <SliderTopBar>
              <SliderTitleArea>{slidersTitle}</SliderTitleArea>
              <ButtonArea>
                <button onClick={decreaseIndex}>{'<'}</button>
                <button onClick={incraseIndex}>{'>'}</button>
              </ButtonArea>
            </SliderTopBar>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={getSliderBoxId(movie.id, sliderAndScreenType)}
                      key={getSliderBoxId(movie.id, sliderAndScreenType)}
                      variants={BoxVariants}
                      whileHover="hover"
                      initial="normal"
                      onClick={() => onBoxClicked(getSliderBoxId(movie.id, sliderAndScreenType))}
                      transition={{ type: 'tween' }}
                      bgphoto={makeImagePath(movie.backdrop_path ?? '', 'w500')}
                    >
                      {(movie.title && movie.title) ?? (movie.name && movie.name)}
                      <Info variants={infoVariants}>
                        <h4>{(movie.title && movie.title) ?? (movie.name && movie.name)}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </SliderArea>
          {/* <AnimatePresence>
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
          </AnimatePresence> */}
        </>
      )}
    </>
  );
}
export default Slider;
