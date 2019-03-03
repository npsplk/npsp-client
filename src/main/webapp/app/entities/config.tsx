import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LocationType from './location-type';
import TransportType from './transport-type';
import VehicleFacility from './vehicle-facility';
import Vehicle from './vehicle';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/location-type`} component={LocationType} />
      <ErrorBoundaryRoute path={`${match.url}/transport-type`} component={TransportType} />
      <ErrorBoundaryRoute path={`${match.url}/vehicle-facility`} component={VehicleFacility} />
      <ErrorBoundaryRoute path={`${match.url}/vehicle`} component={Vehicle} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
