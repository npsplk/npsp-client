import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ParkingSlot from './parking-slot';
import ParkingSlotDetail from './parking-slot-detail';
import ParkingSlotUpdate from './parking-slot-update';
import ParkingSlotDeleteDialog from './parking-slot-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ParkingSlotUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ParkingSlotUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ParkingSlotDetail} />
      <ErrorBoundaryRoute path={match.url} component={ParkingSlot} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ParkingSlotDeleteDialog} />
  </>
);

export default Routes;
