import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicleOwner } from 'app/shared/model/vehicle-owner.model';
import { getEntities as getVehicleOwners } from 'app/entities/vehicle-owner/vehicle-owner.reducer';
import { ITransportType } from 'app/shared/model/transport-type.model';
import { getEntities as getTransportTypes } from 'app/entities/transport-type/transport-type.reducer';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';
import { getEntities as getVehicleFacilities } from 'app/entities/vehicle-facility/vehicle-facility.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vehicle.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVehicleUpdateState {
  isNew: boolean;
  idsvehicleFacility: any[];
  ownerId: string;
  transportTypeId: string;
}

export class VehicleUpdate extends React.Component<IVehicleUpdateProps, IVehicleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsvehicleFacility: [],
      ownerId: '0',
      transportTypeId: '0',
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

    this.props.getVehicleOwners();
    this.props.getTransportTypes();
    this.props.getVehicleFacilities();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { vehicleEntity } = this.props;
      const entity = {
        ...vehicleEntity,
        ...values,
        vehicleFacilities: mapIdList(values.vehicleFacilities)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/config/vehicle');
  };

  render() {
    const { vehicleEntity, vehicleOwners, transportTypes, vehicleFacilities, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="npspClientApp.vehicle.home.createOrEditLabel">Create or edit a Vehicle</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : vehicleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="vehicle-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="numberPlateLabel" for="numberPlate">
                    Number Plate
                  </Label>
                  <AvField
                    id="vehicle-numberPlate"
                    type="text"
                    name="numberPlate"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="numberOfSeatsLabel" for="numberOfSeats">
                    Number Of Seats
                  </Label>
                  <AvField
                    id="vehicle-numberOfSeats"
                    type="string"
                    className="form-control"
                    name="numberOfSeats"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="owner.id">Owner</Label>
                  <AvInput id="vehicle-owner" type="select" className="form-control" name="owner.id">
                    <option value="" key="0" />
                    {vehicleOwners
                      ? vehicleOwners.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="transportType.id">Transport Type</Label>
                  <AvInput id="vehicle-transportType" type="select" className="form-control" name="transportType.id">
                    <option value="" key="0" />
                    {transportTypes
                      ? transportTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="vehicleFacilities">Vehicle Facility</Label>
                  <AvInput
                    id="vehicle-vehicleFacility"
                    type="select"
                    multiple
                    className="form-control"
                    name="vehicleFacilities"
                    value={vehicleEntity.vehicleFacilities && vehicleEntity.vehicleFacilities.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {vehicleFacilities
                      ? vehicleFacilities.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/config/vehicle" replace color="info">
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
  vehicleOwners: storeState.vehicleOwner.entities,
  transportTypes: storeState.transportType.entities,
  vehicleFacilities: storeState.vehicleFacility.entities,
  vehicleEntity: storeState.vehicle.entity,
  loading: storeState.vehicle.loading,
  updating: storeState.vehicle.updating,
  updateSuccess: storeState.vehicle.updateSuccess
});

const mapDispatchToProps = {
  getVehicleOwners,
  getTransportTypes,
  getVehicleFacilities,
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
)(VehicleUpdate);
