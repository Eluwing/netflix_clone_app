import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';
// import { ReactQueryDevtools } from 'react-query/devtools';

function App(): JSX.Element {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={['/', '/movies/:movieId']}>
          <Home />
        </Route>
      </Switch>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </Router>
  );
}

export default App;
