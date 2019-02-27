import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './route-location.reducer';
import { IRouteLocation } from 'app/shared/model/route-location.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRouteLocationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RouteLocationDetail extends React.Component<IRouteLocationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { routeLocationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            RouteLocation [<b>{routeLocationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="sequenceNumber">Sequence Number</span>
            </dt>
            <dd>{routeLocationEntity.sequenceNumber}</dd>
            <dt>Route</dt>
            <dd>{routeLocationEntity.route ? routeLocationEntity.route.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/route-location" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/route-location/${routeLocationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ routeLocation }: IRootState) => ({
  routeLocationEntity: routeLocation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteLocationDetail);
