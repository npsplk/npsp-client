import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ScheduleTemplate from './schedule-template';
import ScheduleTemplateDetail from './schedule-template-detail';
import ScheduleTemplateUpdate from './schedule-template-update';
import ScheduleTemplateDeleteDialog from './schedule-template-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ScheduleTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ScheduleTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ScheduleTemplateDetail} />
      <ErrorBoundaryRoute path={match.url} component={ScheduleTemplate} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ScheduleTemplateDeleteDialog} />
  </>
);

export default Routes;
