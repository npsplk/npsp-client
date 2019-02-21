import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicle } from 'app/shared/model/vehicle.model';
import { getEntities as getVehicles } from 'app/entities/vehicle/vehicle.reducer';
import { ISchedule } from 'app/shared/model/schedule.model';
import { getEntities as getSchedules } from 'app/entities/schedule/schedule.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle-facility.reducer';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleFacilityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVehicleFacilityUpdateState {
  isNew: boolean;
  vehicleId: string;
  scheduleId: string;
}

export class VehicleFacilityUpdate extends React.Component<IVehicleFacilityUpdateProps, IVehicleFacilityUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId: '0',
      scheduleId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getVehicles();
    this.props.getSchedules();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { vehicleFacilityEntity } = this.props;
      const entity = {
        ...vehicleFacilityEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/config/vehicle-facility');
  };

  render() {
    const { vehicleFacilityEntity, vehicles, schedules, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="npspClientApp.vehicleFacility.home.createOrEditLabel">Create or edit a VehicleFacility</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : vehicleFacilityEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="vehicle-facility-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="facilityNameLabel" for="facilityName">
                    Facility Name
                  </Label>
                  <AvField
                    id="vehicle-facility-facilityName"
                    type="text"
                    name="facilityName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="facilityMetaLabel" for="facilityMeta">
                    Facility Meta
                  </Label>
                  <AvField
                    id="vehicle-facility-facilityMeta"
                    type="text"
                    name="facilityMeta"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    Description
                  </Label>
                  <AvField id="vehicle-facility-description" type="text" name="description" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/config/vehicle-facility" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  vehicles: storeState.vehicle.entities,
  schedules: storeState.schedule.entities,
  vehicleFacilityEntity: storeState.vehicleFacility.entity,
  loading: storeState.vehicleFacility.loading,
  updating: storeState.vehicleFacility.updating,
  updateSuccess: storeState.vehicleFacility.updateSuccess
});

const mapDispatchToProps = {
  getVehicles,
  getSchedules,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehicleFacilityUpdate);
