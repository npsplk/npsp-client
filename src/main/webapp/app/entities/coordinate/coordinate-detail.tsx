import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './coordinate.reducer';
import { ICoordinate } from 'app/shared/model/coordinate.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICoordinateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CoordinateDetail extends React.Component<ICoordinateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { coordinateEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Coordinate [<b>{coordinateEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="longitude">Longitude</span>
            </dt>
            <dd>{coordinateEntity.longitude}</dd>
            <dt>
              <span id="latitude">Latitude</span>
            </dt>
            <dd>{coordinateEntity.latitude}</dd>
            <dt>Route</dt>
            <dd>{coordinateEntity.route ? coordinateEntity.route.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/coordinate" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/coordinate/${coordinateEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ coordinate }: IRootState) => ({
  coordinateEntity: coordinate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoordinateDetail);
