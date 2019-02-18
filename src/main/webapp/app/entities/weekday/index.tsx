import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Weekday from './weekday';
import WeekdayDetail from './weekday-detail';
import WeekdayUpdate from './weekday-update';
import WeekdayDeleteDialog from './weekday-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WeekdayUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WeekdayUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WeekdayDetail} />
      <ErrorBoundaryRoute path={match.url} component={Weekday} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={WeekdayDeleteDialog} />
  </>
);

export default Routes;
