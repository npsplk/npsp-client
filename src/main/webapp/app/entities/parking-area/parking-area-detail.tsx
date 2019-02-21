import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './parking-area.reducer';
import { IParkingArea } from 'app/shared/model/parking-area.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IParkingAreaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ParkingAreaDetail extends React.Component<IParkingAreaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { parkingAreaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ParkingArea [<b>{parkingAreaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="areaName">Area Name</span>
            </dt>
            <dd>{parkingAreaEntity.areaName}</dd>
            <dt>Location</dt>
            <dd>{parkingAreaEntity.location ? parkingAreaEntity.location.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/config/parking-area" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/config/parking-area/${parkingAreaEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ parkingArea }: IRootState) => ({
  parkingAreaEntity: parkingArea.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParkingAreaDetail);
