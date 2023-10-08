import React, { Dispatch, SetStateAction } from 'react';

interface paginationProps {
  currPage: number;
  setCurrPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}
function Pagination({ currPage, setCurrPage, totalPages }: paginationProps): JSX.Element {
  return <>{'Pagination'}</>;
}
export default Pagination;
