import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

const Links = React.lazy(() => import('./links'));

const Views = React.memo(() => (
  <Switch>
    <Route exact path="/" render={(props) => <Links {...props} />} />
  </Switch>
));

export default withRouter(Views);
