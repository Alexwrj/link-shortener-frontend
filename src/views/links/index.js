import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

const LinkGenerator = React.lazy(() => import('./LinkGenerator'));

const Links = React.memo(() => (
  <Switch>
    <Route exact path="/" render={(props) => <LinkGenerator {...props} />} />
  </Switch>
));

export default withRouter(Links);
