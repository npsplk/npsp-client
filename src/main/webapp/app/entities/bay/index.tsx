import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bay from './bay';
import BayDetail from './bay-detail';
import BayUpdate from './bay-update';
import BayDeleteDialog from './bay-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BayUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BayUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BayDetail} />
      <ErrorBoundaryRoute path={match.url} component={Bay} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={BayDeleteDialog} />
  </>
);

export default Routes;
