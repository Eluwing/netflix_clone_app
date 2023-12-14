import React from 'react';
import styled from 'styled-components';

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface loadingProps {
  isLoading: boolean;
  loadingText: string;
}

function Loading({ isLoading, loadingText }: loadingProps): JSX.Element {
  return <>{isLoading ? <Loader>{loadingText}</Loader> : <>{null}</>}</>;
}
export default Loading;
