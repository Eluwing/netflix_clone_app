import React, { Dispatch, SetStateAction } from 'react';

interface paginationProps {
  currPage: number;
  setCurrPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}
function Pagination({ currPage, setCurrPage, totalPages }: paginationProps): JSX.Element {
  return (
    <>
      <button>{'<'}</button>
      {Array(totalPages)
        .fill(0)
        .map((_, i) => {
          return <button key={i + 1}>{i + 1}</button>;
        })}
      <button>{'>'}</button>
    </>
  );
}
export default Pagination;
