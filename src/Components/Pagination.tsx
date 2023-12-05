import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const PaginationPanel = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: rgb(229, 9, 20);
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

interface paginationProps {
  currPage: number;
  setCurrPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}
function Pagination({ currPage, setCurrPage, totalPages }: paginationProps): JSX.Element {
  return (
    <PaginationPanel>
      <Button onClick={() => setCurrPage((prev) => prev - 1)} disabled={currPage === 1}>
        {'<'}
      </Button>
      {Array(totalPages)
        .fill(0)
        .map((_, i) => {
          return (
            <Button
              key={i + 1}
              onClick={() => setCurrPage(i + 1)}
              aria-current={currPage === i + 1 ? 'page' : undefined}
            >
              {i + 1}
            </Button>
          );
        })}
      <Button onClick={() => setCurrPage((prev) => prev + 1)} disabled={currPage === totalPages}>
        {'>'}
      </Button>
    </PaginationPanel>
  );
}
export default Pagination;