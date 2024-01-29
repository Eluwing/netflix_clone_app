import React, { useEffect, useState } from 'react';
import { IMovieOrTvSearch, getTotalMovieKeywordSearch, getTotalTvKeywordSearch } from '../api';
import { SCREEN_TYPES } from '../Constants/Common';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { getScreenTitle, makeImagePath } from '../utils';
import Pagination from './Pagination';

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
  &:hover {
    border-radius: 10px 10px 0 0;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
`;

const BoxListArea = styled.div`
  width: 100%;
  margin-top: 60px;
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

const SearchResultTitleArea = styled.div`
  font-size: 20px;
  font-weight: 1000;
  margin-bottom: 10px;
`;

interface SearchResultProps {
  keyword: string | null;
  screenType: number;
}

const BOX_OFFSET = 18;

function SearchResult({ keyword, screenType }: SearchResultProps): JSX.Element {
  // Set initial IMovieOrTvSearch Interface for avoid debug error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emptyInitialObject: IMovieOrTvSearch = {} as any;
  const [data, setData] = useState<[IMovieOrTvSearch]>([emptyInitialObject]);
  /**
   * State hook for managing the total number of search results.
   */
  const [totalSearchResult, setTotalSearchResult] = useState<number>(0);
  /**
   * Retrieves the screen title based on the specified screen type.
   */
  const screenTitle = getScreenTitle(screenType);
  const [currPage, setCurrPage] = useState<number>(1);
  const totalPages = Math.ceil(totalSearchResult / BOX_OFFSET);
  const firstIndexCurrPage = (currPage - 1) * BOX_OFFSET;
  // Fetch data based on the screen type
  switch (screenType) {
    case SCREEN_TYPES.TV:
      useEffect(() => {
        void getTotalTvKeywordSearch(keyword, 1, 3).then((data) => {
          setData(data);
          setTotalSearchResult(data.length);
        });
      }, []);
      break;
    case SCREEN_TYPES.MOVIES:
      useEffect(() => {
        void getTotalMovieKeywordSearch(keyword, 1, 3).then((data) => {
          setData(data);
          setTotalSearchResult(data.length);
        });
      }, []);
      break;
    default:
      throw new Error('Not exist Screen Type Code');
  }

  return (
    <>
      <BoxListArea>
        <SearchResultTitleArea>{screenTitle}</SearchResultTitleArea>
        <Row
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween', duration: 1 }}
        >
          {data
            .slice(firstIndexCurrPage, firstIndexCurrPage + BOX_OFFSET)
            .map((screenResultData, index) => (
              <Box
                key={index}
                bgphoto={makeImagePath(screenResultData.backdrop_path ?? '', 'w500')}
              >
                {(screenResultData.title && screenResultData.title) ??
                  (screenResultData.name && screenResultData.name)}
                <Info>
                  <InfoTitle>
                    {(screenResultData.title && screenResultData.title) ??
                      (screenResultData.name && screenResultData.name)}
                  </InfoTitle>
                </Info>
              </Box>
            ))}
        </Row>
      </BoxListArea>
      <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={totalPages} />
    </>
  );
}
export default SearchResult;
