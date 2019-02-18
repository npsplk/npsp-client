import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ParkingArea from './parking-area';
import ParkingAreaDetail from './parking-area-detail';
import ParkingAreaUpdate from './parking-area-update';
import ParkingAreaDeleteDialog from './parking-area-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ParkingAreaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ParkingAreaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ParkingAreaDetail} />
      <ErrorBoundaryRoute path={match.url} component={ParkingArea} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ParkingAreaDeleteDialog} />
  </>
);

export default Routes;
