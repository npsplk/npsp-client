import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleFacility from './vehicle-facility';
import VehicleFacilityDetail from './vehicle-facility-detail';
import VehicleFacilityUpdate from './vehicle-facility-update';
import VehicleFacilityDeleteDialog from './vehicle-facility-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleFacilityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleFacilityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleFacilityDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleFacility} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VehicleFacilityDeleteDialog} />
  </>
);

export default Routes;
