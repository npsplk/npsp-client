import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Trip from './trip';
import TripDetail from './trip-detail';
import TripUpdate from './trip-update';
import TripDeleteDialog from './trip-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TripUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TripUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TripDetail} />
      <ErrorBoundaryRoute path={match.url} component={Trip} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TripDeleteDialog} />
  </>
);

export default Routes;
