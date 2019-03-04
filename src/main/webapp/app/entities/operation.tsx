import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ScheduleTemplate from './schedule-template';
import ScheduleInstance from './schedule-instance';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}/schedule-template`} component={ScheduleTemplate} />
        <ErrorBoundaryRoute path={`${match.url}/schedule-instance`} component={ScheduleInstance} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
