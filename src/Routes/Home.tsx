import React from 'react';
import { useQuery } from 'react-query';
import { getMovies } from '../api';

function Home(): JSX.Element {
  const { data, isLoading } = useQuery(['movies', 'noewPlaying'], getMovies);
  return <div style={{ background: 'white', height: '200vh' }}></div>;
}

export default Home;
