import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Route from './route';
import Location from './location';
import Schedule from './schedule';
import Trip from './trip';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/route`} component={Route} />
      <ErrorBoundaryRoute path={`${match.url}/location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}/schedule`} component={Schedule} />
      <ErrorBoundaryRoute path={`${match.url}/trip`} component={Trip} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
