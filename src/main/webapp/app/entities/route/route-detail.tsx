import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './route.reducer';
import { IRoute } from 'app/shared/model/route.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRouteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RouteDetail extends React.Component<IRouteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  handleClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { routeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Route [<b>{routeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="routeName">Route Name</span>
            </dt>
            <dd>{routeEntity.routeName}</dd>
            <dt>
              <span id="routeNumber">Route Number</span>
            </dt>
            <dd>{routeEntity.routeNumber}</dd>
              <dt>Route Locations</dt>
              <dd>
                  {routeEntity.routeLocations
                      ? routeEntity.routeLocations.map((val, i) => (
                          <span key={val.id}>
                      <a>{val.sequenceNumber} {val.location.locationName}</a>
                              {i === routeEntity.routeLocations.length - 1 ? '' : ', '}
                    </span>
                      ))
                      : null}
              </dd>
          </dl>
          <Button onClick={this.handleClose} replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/config/route/${routeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ route }: IRootState) => ({
  routeEntity: route.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteDetail);
