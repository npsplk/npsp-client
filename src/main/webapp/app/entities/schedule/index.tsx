import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Schedule from './schedule';
import ScheduleDetail from './schedule-detail';
import ScheduleUpdate from './schedule-update';
import ScheduleDeleteDialog from './schedule-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ScheduleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ScheduleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ScheduleDetail} />
      <ErrorBoundaryRoute path={match.url} component={Schedule} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ScheduleDeleteDialog} />
  </>
);

export default Routes;
