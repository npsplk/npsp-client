import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicle } from 'app/shared/model/vehicle.model';
import { getEntities as getVehicles } from 'app/entities/vehicle/vehicle.reducer';
import { ISchedule } from 'app/shared/model/schedule.model';
import { getEntities as getSchedules } from 'app/entities/schedule/schedule.reducer';
import { IParkingSlot } from 'app/shared/model/parking-slot.model';
import { getEntities as getParkingSlots } from 'app/entities/parking-slot/parking-slot.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer, convertTimeFromServer, convertLocalTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITripUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITripUpdateState {
  isNew: boolean;
  vehicleId: string;
  scheduleId: string;
  parkingSlotId: string;
}

export class TripUpdate extends React.Component<ITripUpdateProps, ITripUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId: '0',
      scheduleId: '0',
      parkingSlotId: '0',
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
    this.props.getParkingSlots();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.startTime = convertDateTimeToServer('2019-02-08T' + values.startTime);
    values.endTime = convertDateTimeToServer('2019-02-08T' + values.endTime);

    if (errors.length === 0) {
      const { tripEntity } = this.props;
      const entity = {
        ...tripEntity,
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
    this.props.history.push('/operation/trip');
  };

  render() {
    const { tripEntity, vehicles, schedules, parkingSlots, loading, updating } = this.props;
    const { isNew } = this.state;

    const { specialNotes } = tripEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="npspClientApp.trip.home.createOrEditLabel">{isNew ? 'Create a' : 'Edit'} Trip</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tripEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="trip-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startDateLabel" for="startDate">
                    Start Date
                  </Label>
                  <AvField id="trip-startDate" type="date" className="form-control" name="startDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="startTimeLabel" for="startTime">
                    Start Time
                  </Label>
                  <AvInput
                    id="trip-startTime"
                    type="time"
                    className="form-control"
                    name="startTime"
                    value={isNew ? null : convertTimeFromServer(this.props.tripEntity.startTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endTimeLabel" for="endTime">
                    End Time
                  </Label>
                  <AvInput
                    id="trip-endTime"
                    type="time"
                    className="form-control"
                    name="endTime"
                    value={isNew ? null : convertTimeFromServer(this.props.tripEntity.endTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="specialNotesLabel" for="specialNotes">
                    Special Notes
                  </Label>
                  <AvInput id="trip-specialNotes" type="textarea" name="specialNotes" />
                </AvGroup>
                <AvGroup>
                  <Label for="vehicle.id">Vehicle</Label>
                  <AvInput id="trip-vehicle" type="select" className="form-control" name="vehicle.id">
                    <option value="" key="0" />
                    {vehicles
                      ? vehicles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.numberPlate}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="schedule.id">Schedule</Label>
                  <AvInput id="trip-schedule" type="select" className="form-control" name="schedule.id">
                    <option value="" key="0" />
                    {schedules
                      ? schedules.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.route.routeName} - {otherEntity.startLocation.locationName} to {otherEntity.endLocation.locationName}
                             [ {convertLocalTimeFromServer(otherEntity.startTime)} to {convertLocalTimeFromServer(otherEntity.endTime)} ]
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                {/*<AvGroup>*/}
                  {/*<Label for="parkingSlot.id">Parking Slot</Label>*/}
                  {/*<AvInput id="trip-parkingSlot" type="select" className="form-control" name="parkingSlot.id">*/}
                    {/*<option value="" key="0" />*/}
                    {/*{parkingSlots*/}
                      {/*? parkingSlots.map(otherEntity => (*/}
                          {/*<option value={otherEntity.id} key={otherEntity.id}>*/}
                            {/*{otherEntity.id}*/}
                          {/*</option>*/}
                        {/*))*/}
                      {/*: null}*/}
                  {/*</AvInput>*/}
                {/*</AvGroup>*/}
                <Button tag={Link} id="cancel-save" to="/operation/trip" replace color="info">
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
  parkingSlots: storeState.parkingSlot.entities,
  tripEntity: storeState.trip.entity,
  loading: storeState.trip.loading,
  updating: storeState.trip.updating,
  updateSuccess: storeState.trip.updateSuccess
});

const mapDispatchToProps = {
  getVehicles,
  getSchedules,
  getParkingSlots,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripUpdate);
