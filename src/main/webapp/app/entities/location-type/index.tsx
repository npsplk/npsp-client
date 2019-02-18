import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LocationType from './location-type';
import LocationTypeDetail from './location-type-detail';
import LocationTypeUpdate from './location-type-update';
import LocationTypeDeleteDialog from './location-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LocationTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LocationTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LocationTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={LocationType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LocationTypeDeleteDialog} />
  </>
);

export default Routes;
