import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RouteLocation from './route-location';
import RouteLocationDetail from './route-location-detail';
import RouteLocationUpdate from './route-location-update';
import RouteLocationDeleteDialog from './route-location-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RouteLocationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RouteLocationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RouteLocationDetail} />
      <ErrorBoundaryRoute path={match.url} component={RouteLocation} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RouteLocationDeleteDialog} />
  </>
);

export default Routes;
