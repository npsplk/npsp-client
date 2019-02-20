import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Route from './route';
import Location from './location';
import ParkingArea from './parking-area';
import ParkingSlot from './parking-slot';
import LocationType from './location-type';
import TransportType from './transport-type';
import VehicleFacility from './vehicle-facility';
import Vehicle from './vehicle';
import VehicleOwner from './vehicle-owner';
import Schedule from './schedule';
import Trip from './trip';
import Weekday from './weekday';
import RouteLocation from './route-location';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/route`} component={Route} />
      <ErrorBoundaryRoute path={`${match.url}/location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}/parking-area`} component={ParkingArea} />
      <ErrorBoundaryRoute path={`${match.url}/parking-slot`} component={ParkingSlot} />
      <ErrorBoundaryRoute path={`${match.url}/location-type`} component={LocationType} />
      <ErrorBoundaryRoute path={`${match.url}/transport-type`} component={TransportType} />
      <ErrorBoundaryRoute path={`${match.url}/vehicle-facility`} component={VehicleFacility} />
      <ErrorBoundaryRoute path={`${match.url}/vehicle`} component={Vehicle} />
      <ErrorBoundaryRoute path={`${match.url}/vehicle-owner`} component={VehicleOwner} />
      <ErrorBoundaryRoute path={`${match.url}/schedule`} component={Schedule} />
      <ErrorBoundaryRoute path={`${match.url}/trip`} component={Trip} />
      <ErrorBoundaryRoute path={`${match.url}/weekday`} component={Weekday} />
      <ErrorBoundaryRoute path={`${match.url}/route-location`} component={RouteLocation} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
