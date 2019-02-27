import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Driver from './driver';
import DriverDetail from './driver-detail';
import DriverUpdate from './driver-update';
import DriverDeleteDialog from './driver-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DriverUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DriverUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DriverDetail} />
      <ErrorBoundaryRoute path={match.url} component={Driver} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DriverDeleteDialog} />
  </>
);

export default Routes;
