import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VehicleDetail extends React.Component<IVehicleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vehicleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Vehicle [<b>{vehicleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="registrationNumber">Registration Number</span>
            </dt>
            <dd>{vehicleEntity.registrationNumber}</dd>
            <dt>
              <span id="numberOfSeats">Number Of Seats</span>
            </dt>
            <dd>{vehicleEntity.numberOfSeats}</dd>
            <dt>Driver</dt>
            <dd>{vehicleEntity.driver ? vehicleEntity.driver.id : ''}</dd>
            <dt>Transport Type</dt>
            <dd>{vehicleEntity.transportType ? vehicleEntity.transportType.id : ''}</dd>
            <dt>Vehicle Facility</dt>
            <dd>
              {vehicleEntity.vehicleFacilities
                ? vehicleEntity.vehicleFacilities.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === vehicleEntity.vehicleFacilities.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/vehicle" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/vehicle/${vehicleEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ vehicle }: IRootState) => ({
  vehicleEntity: vehicle.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehicleDetail);
