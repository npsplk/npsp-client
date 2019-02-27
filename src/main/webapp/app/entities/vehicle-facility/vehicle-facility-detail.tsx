import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-facility.reducer';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleFacilityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VehicleFacilityDetail extends React.Component<IVehicleFacilityDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vehicleFacilityEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            VehicleFacility [<b>{vehicleFacilityEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="facilityName">Facility Name</span>
            </dt>
            <dd>{vehicleFacilityEntity.facilityName}</dd>
            <dt>
              <span id="facilityMeta">Facility Meta</span>
            </dt>
            <dd>{vehicleFacilityEntity.facilityMeta}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{vehicleFacilityEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/vehicle-facility" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/vehicle-facility/${vehicleFacilityEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ vehicleFacility }: IRootState) => ({
  vehicleFacilityEntity: vehicleFacility.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehicleFacilityDetail);
