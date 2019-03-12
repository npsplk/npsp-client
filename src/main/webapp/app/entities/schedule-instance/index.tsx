import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ScheduleInstance from './schedule-instance';
import ScheduleInstanceDetail from './schedule-instance-detail';
import ScheduleInstanceCreate from './schedule-instance-create';
import ScheduleInstanceUpdate from './schedule-instance-update';
import ScheduleInstanceDeleteDialog from './schedule-instance-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ScheduleInstanceCreate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ScheduleInstanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ScheduleInstanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={ScheduleInstance} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ScheduleInstanceDeleteDialog} />
  </>
);

export default Routes;
