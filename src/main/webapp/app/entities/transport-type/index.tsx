import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TransportType from './transport-type';
import TransportTypeDetail from './transport-type-detail';
import TransportTypeUpdate from './transport-type-update';
import TransportTypeDeleteDialog from './transport-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TransportTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TransportTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TransportTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={TransportType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TransportTypeDeleteDialog} />
  </>
);

export default Routes;
