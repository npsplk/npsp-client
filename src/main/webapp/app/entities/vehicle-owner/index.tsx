import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleOwner from './vehicle-owner';
import VehicleOwnerDetail from './vehicle-owner-detail';
import VehicleOwnerUpdate from './vehicle-owner-update';
import VehicleOwnerDeleteDialog from './vehicle-owner-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleOwnerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleOwnerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleOwnerDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleOwner} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VehicleOwnerDeleteDialog} />
  </>
);

export default Routes;
