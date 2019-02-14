import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Coordinate from './coordinate';
import CoordinateDetail from './coordinate-detail';
import CoordinateUpdate from './coordinate-update';
import CoordinateDeleteDialog from './coordinate-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CoordinateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CoordinateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CoordinateDetail} />
      <ErrorBoundaryRoute path={match.url} component={Coordinate} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CoordinateDeleteDialog} />
  </>
);

export default Routes;
