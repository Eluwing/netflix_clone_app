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
  IGetMoviesResult,
  IGetMostNewlyTvResult,
} from '../api';
import { match, useRouteMatch } from 'react-router-dom';
import { getSliderBoxId, getSlidersTitle, makeImagePath } from '../utils';
import {
  API_INTERFACE_TYPES,
  SCREEN_QUERY_KEY,
  SCREEN_TYPES,
  SLIDER_TYPES,
} from '../Constants/Common';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import HoverDetail from './HoverDetail';

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
  &:hover {
    border-radius: 10px 10px 0px 0px;
  }
`;

const SliderArea = styled.div``;

const SliderTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SliderTitleArea = styled.div`
  font-size: 20px;
  font-weight: 1000;
`;

const CommonButton = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
  width: 4vmin;
  box-sizing: border-box;
  background-color: #000;
  opacity: 0.6;
  justify-content: center;
`;

const NextButtonArea = styled(CommonButton)`
  right: 0%;
`;
const PrevButtonArea = styled(CommonButton)`
  left: 0%;
`;

const BoxArea = styled.div`
  display: flex;
  position: relative;
`;
const BoxListArea = styled.div`
  width: 100%;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
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
  isBoxPopUp: SetStateAction<boolean>;
  isSetBoxPopUp: Dispatch<SetStateAction<boolean>>;
  setScreenId: Dispatch<SetStateAction<string | undefined>>;
  screenId: string | undefined;
}

interface useQueryType<TInterface> {
  data: TInterface | undefined;
  isLoading: boolean;
}

function Slider({
  sliderType,
  screenType,
  isSetBoxPopUp,
  isBoxPopUp,
  setScreenId,
  screenId,
}: ISliderProps): JSX.Element {
  /**
   * Concatenates the slider type and screen type to create a unique identifier.
   */
  const sliderAndScreenType = sliderType.concat(String(screenType));
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  /**
   * State hook for managing the popup movie match.
   */
  const [, setPopUpMovieMatch] = useState<match<{ screenId: string }> | null>();
  const emptyData: useQueryType<API_INTERFACE_TYPES> = {
    // Because it is not possible to set an empty object in TypeScript
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    data: {} as API_INTERFACE_TYPES,
    isLoading: true,
  };
  const queryClient = useQueryClient();
  /**
   * Retrieves query options based on the specified slider type.
   * @param {string} sliderTypeProp - The type of slider.
   * @returns {useQueryType<API_INTERFACE_TYPES>} - Query options for the specified slider type.
   */
  const getQueryOptions = (sliderTypeProp: string): useQueryType<API_INTERFACE_TYPES> => {
    switch (sliderTypeProp) {
      case SLIDER_TYPES.NOW_PLAYING_MOVIE:
        return {
          data: queryClient.getQueryData<IGetMoviesResult>([
            SCREEN_QUERY_KEY.MOVIE,
            SCREEN_QUERY_KEY.NOW_PLAYING,
          ]),
          isLoading: false,
        };
      case SLIDER_TYPES.POPULAR_MOVIE:
        return useQuery<IGetPopularMoviesResult>({
          queryKey: [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.POPULAR],
          queryFn: getPopularMovies,
        });
      case SLIDER_TYPES.TOP_RATED_MOVIE:
        return useQuery<IGetTopRatedMoviesResult>({
          queryKey: [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.TOP_RATED],
          queryFn: getTopRatedMovies,
        });
      case SLIDER_TYPES.UPCOMING_MOVIE:
        return useQuery<IGetUpcomingMoviesResult>({
          queryKey: [SCREEN_QUERY_KEY.MOVIE, SCREEN_QUERY_KEY.UPCOMING],
          queryFn: getUpcomingMovies,
        });
      case SLIDER_TYPES.AIRING_TODAY_TV:
        return {
          data: queryClient.getQueryData([SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.AIRING_TODAY]),
          isLoading: false,
        };
      case SLIDER_TYPES.POPULAR_TV:
        return useQuery<IGetPopularTvResult>({
          queryKey: [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.POPULAR],
          queryFn: getPopularTv,
        });
      case SLIDER_TYPES.CURRENT_ON_AIR_TV:
        return useQuery<IGetCurrentOnAirTvResult>({
          queryKey: [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.CURRENT_ON_AIR],
          queryFn: getCurrentOnAirTv,
        });
      case SLIDER_TYPES.MOST_NEWLY_TV:
        return useQuery<IGetMostNewlyTvResult>({
          queryKey: [SCREEN_QUERY_KEY.TV, SCREEN_QUERY_KEY.UPCOMING],
          queryFn: getMostNewlyTv,
        });
      default:
        return emptyData;
    }
  };
  /**
   * Fetches data and loading state based on the specified slider type.
   */
  const { data, isLoading }: useQueryType<API_INTERFACE_TYPES> = getQueryOptions(sliderType);
  /**
   * Increases the index for the slider.
   */
  const incraseIndex = (): void => {
    if (data != null) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  /**
   * Decreases the index for the slider.
   */
  const decreaseIndex = (): void => {
    if (data != null) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev - 1));
    }
  };
  /**
   * Toggles the leaving state.
   */
  const toggleLeaving = (): void => setLeaving((prev) => !prev);

  /**
   * Handles the hover event on a box, updating the screenId state.
   *
   * @param {string} screenId - The identifier of the screen associated with the hovered box.
   * @returns {void}
   */
  const onBoxHovered = (screenId: string): void => {
    setScreenId(screenId);
  };
  /**
   * Retrieves the title for the sliders based on the specified slider type.
   */
  const slidersTitle = getSlidersTitle(sliderType);
  /**
   * Configures the popup movie match based on the screen type and ID.
   */
  useEffect(() => {
    if (screenType === SCREEN_TYPES.MOVIES) {
      setPopUpMovieMatch((prev) => useRouteMatch<{ screenId: string }>('/movies/:screenId'));
    } else if (screenType === SCREEN_TYPES.TV) {
      setPopUpMovieMatch((prev) => useRouteMatch<{ screenId: string }>('/tv/:screenId'));
    }
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
            </SliderTopBar>
            <BoxArea>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <PrevButtonArea key={sliderAndScreenType.concat(String(index)).concat('prev')}>
                  <IoIosArrowBack
                    style={{ height: '100%' }}
                    onClick={decreaseIndex}
                  ></IoIosArrowBack>
                </PrevButtonArea>
                <BoxListArea>
                  <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: 'tween', duration: 1 }}
                    key={sliderAndScreenType.concat(String(index)).concat('box')}
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
                          // onClick={() =>
                          //   onBoxHovered(getSliderBoxId(movie.id, sliderAndScreenType))
                          // }
                          onHoverStart={() =>
                            onBoxHovered(getSliderBoxId(movie.id, sliderAndScreenType))
                          }
                          // onHoverStart={() => setIsBoxHover(true)}
                          // onHoverEnd={() => setIsBoxHover(false)}
                          transition={{ type: 'tween' }}
                          bgPhoto={makeImagePath(movie.backdrop_path ?? '', 'w500')}
                        >
                          {(movie.title && movie.title) ?? (movie.name && movie.name)}
                          <>
                            <HoverDetail
                              sliderBoxId={screenId}
                              /* if have movie, need modify code that variable in parameter value  */
                              backdropMoviePath={''}
                              isBoxPopUp={isBoxPopUp}
                              isSetBoxPopUp={isSetBoxPopUp}
                              setScreenId={setScreenId}
                              screenId={screenId}
                              screenType={screenType}
                            />
                          </>
                        </Box>
                      ))}
                  </Row>
                </BoxListArea>
                <NextButtonArea key={sliderAndScreenType.concat(String(index)).concat('next')}>
                  <IoIosArrowForward
                    style={{ height: '100%' }}
                    onClick={incraseIndex}
                  ></IoIosArrowForward>
                </NextButtonArea>
              </AnimatePresence>
            </BoxArea>
          </SliderArea>
        </>
      )}
    </>
  );
}
export default Slider;
