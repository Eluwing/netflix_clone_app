import React, { useEffect, useState } from 'react';
import { getMovieKeywordSearch, getTvKeywordSearch } from '../api';
import { SCREEN_TYPES, SEARCH_RESULT_INTERFACE_TYPES } from '../Constants/Common';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../utils';

interface SearchResultProps {
  keyword: string | null;
  screenType: number;
}

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

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
`;

const BoxListArea = styled.div`
  width: 100%;
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: -webkit-fill-available;
  bottom: 0;
  &:first-child {
    padding-left: 10px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

const InfoTitle = styled(motion.div)`
  padding-left: 10px;
  text-align: center;
  font-size: 18px;
`;

function SearchResult({ keyword, screenType }: SearchResultProps): JSX.Element {
  const [data, setData] = useState<SEARCH_RESULT_INTERFACE_TYPES>();

  switch (screenType) {
    case SCREEN_TYPES.TV:
      useEffect(() => {
        void getTvKeywordSearch(keyword).then((data) => {
          setData(data);
        });
      }, []);
      break;
    case SCREEN_TYPES.MOVIES:
      useEffect(() => {
        void getMovieKeywordSearch(keyword).then((data) => {
          setData(data);
        });
      }, []);
      break;
    default:
      throw new Error('Not exist Screen Type Code');
  }

  return (
    <>
      <BoxListArea>
        <Row
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween', duration: 1 }}
        >
          {data?.results.map((screenResultData) => (
            <Box
              key={0}
              // onClick={() => onBoxClicked(getSliderBoxId(movie.id, sliderAndScreenType))}
              bgphoto={makeImagePath(screenResultData.backdrop_path ?? '', 'w500')}
            >
              {(screenResultData.title && screenResultData.title) ??
                (screenResultData.name && screenResultData.name)}
              <Info /* variants={infoVariants} */>
                <InfoTitle>
                  {(screenResultData.title && screenResultData.title) ??
                    (screenResultData.name && screenResultData.name)}
                </InfoTitle>
              </Info>
            </Box>
          ))}
        </Row>
      </BoxListArea>
    </>
  );
}
export default SearchResult;
