import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect, withRouter, BrowserRouter } from 'react-router-dom';

const Views = React.lazy(() => import('./views'));

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route exact path="/" render={(props) => <Views {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
    </>
  );
}

export default App;
