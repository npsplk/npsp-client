import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Route from './route';
import RouteDetail from './route-detail';
import RouteUpdate from './route-update';
import RouteDeleteDialog from './route-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RouteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RouteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RouteDetail} />
      <ErrorBoundaryRoute path={match.url} component={Route} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RouteDeleteDialog} />
  </>
);

export default Routes;
