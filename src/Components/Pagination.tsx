import React from 'react';

interface paginationProps {
  currPage: number;
  setCurrPage: React.SetStateAction<number>;
  totalPages: number;
}
function Pagination({ currPage, setCurrPage, totalPages }: paginationProps): JSX.Element {
  return <>{'Pagination'}</>;
}
export default Pagination;
