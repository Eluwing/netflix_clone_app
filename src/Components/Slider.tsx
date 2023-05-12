import { AnimatePresence, motion, useScroll } from 'framer-motion';
import React, { useState } from 'react';
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
} from '../api';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { makeImagePath } from '../utils';
import { API_INTERFACE_TYPES, SCREEN_QUERY_KEY, SCREEN_TYPES } from '../Constants/Common';

interface ISliderProps {
  movieListStyle: string;
}

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
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
  display: inline;
  margin: 30px 0px;
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

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

interface useQueryType<TInterface> {
  data: TInterface | undefined;
  isLoading: boolean;
}

function Slider({ movieListStyle }: ISliderProps): JSX.Element {
  const history = useHistory();
  const emptyData: useQueryType<API_INTERFACE_TYPES> = {
    // Because it is not possible to set an empty object in TypeScript
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    data: {} as API_INTERFACE_TYPES,
    isLoading: true,
  };
  const popUpMovieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
  const queryClient = useQueryClient();
  const { data, isLoading }: useQueryType<API_INTERFACE_TYPES> =
    movieListStyle === SCREEN_TYPES.NOW_PLAYING_MOVIE
      ? {
          data: queryClient.getQueryData([SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.NOW_PLAYING]),
          isLoading: false,
        }
      : // Movie List
      movieListStyle === SCREEN_TYPES.POPULAR_MOVIE
      ? useQuery<IGetPopularMoviesResult>({
          queryKey: [[SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.POPULAR]],
          queryFn: getPopularMovies,
        })
      : movieListStyle === SCREEN_TYPES.TOP_RATED_MOVIE
      ? useQuery<IGetPopularMoviesResult>({
          queryKey: [[SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.TOP_RATED]],
          queryFn: getTopRatedMovies,
        })
      : movieListStyle === SCREEN_TYPES.UPCOMING_MOVIE
      ? useQuery<IGetPopularMoviesResult>({
          queryKey: [[SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.UPCOMING]],
          queryFn: getUpcomingMovies,
        })
      : // TV List
      movieListStyle === SCREEN_TYPES.AIRING_TODAY_TV
      ? {
          data: queryClient.getQueryData([SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.AIRING_TODAY]),
          isLoading: false,
        }
      : movieListStyle === SCREEN_TYPES.POPULAR_TV
      ? useQuery<IGetPopularMoviesResult>({
          queryKey: [[SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.POPULAR]],
          queryFn: getPopularTv,
        })
      : movieListStyle === SCREEN_TYPES.CURRENT_ON_AIR_TV
      ? useQuery<IGetPopularMoviesResult>({
          queryKey: [[SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.CURRENT_ON_AIR]],
          queryFn: getCurrentOnAirTv,
        })
      : movieListStyle === SCREEN_TYPES.MOST_NEWLY_TV
      ? useQuery<IGetPopularMoviesResult>({
          queryKey: [[SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.UPCOMING]],
          queryFn: getMostNewlyTv,
        })
      : emptyData;
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { scrollY } = useScroll();
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
  const onBoxClicked = (movieId: number): void => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = (): void => history.push('/');
  const clickedMovie =
    popUpMovieMatch?.params.movieId &&
    data?.results.find((movie) => String(movie.id) === popUpMovieMatch.params.movieId);
  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <SliderArea key={movieListStyle}>
            <SliderTopBar>
              <SliderTitleArea>{movieListStyle}</SliderTitleArea>
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
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={String(movie.id)}
                      key={movie.id}
                      variants={BoxVariants}
                      whileHover="hover"
                      initial="normal"
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: 'tween' }}
                      bgPhoto={makeImagePath(movie.backdrop_path ?? '', 'w500')}
                    >
                      {movie.title}
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </SliderArea>
          <AnimatePresence>
            {popUpMovieMatch ? (
              <>
                <Overlay onClick={onOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
                <PopUpArea
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={popUpMovieMatch.params.movieId}
                >
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
                      <PopUpTitle>{clickedMovie.title}</PopUpTitle>
                      <PopUpOverview>{clickedMovie.overview}</PopUpOverview>
                    </>
                  )}
                </PopUpArea>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </>
  );
}
export default Slider;
