import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getVehicles } from 'app/entities/vehicle/vehicle.reducer';
import { getEntities as getScheduleTemplates } from 'app/entities/schedule-template/schedule-template.reducer';
import { getEntities as getDrivers } from 'app/entities/driver/driver.reducer';
import { getEntities as getRoutes } from 'app/entities/route/route.reducer';
import { getEntities as getBays } from 'app/entities/bay/bay.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './schedule-instance.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer, convert24HourTimeFromServer, convertToDashedDate, convertLocalTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IScheduleInstanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IScheduleInstanceUpdateState {
  isNew: boolean;
  vehicleId: string;
  scheduleTemplateId: string;
  driverId: string;
  routeId: string;
  bayId: string;
}

export class ScheduleInstanceUpdate extends React.Component<IScheduleInstanceUpdateProps, IScheduleInstanceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId: '0',
      scheduleTemplateId: '0',
      driverId: '0',
      routeId: '0',
      bayId: '0',
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
    this.props.getScheduleTemplates();
    this.props.getDrivers();
    this.props.getRoutes();
    this.props.getBays();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const date_string = convertToDashedDate(values.date) + 'T';
      values.scheduledTime = convertDateTimeToServer(date_string + values.scheduledTime);
      values.actualScheduledTime = convertDateTimeToServer(date_string + values.actualScheduledTime);
      values.actualDepartureTime = convertDateTimeToServer(date_string + values.actualDepartureTime);
      const { scheduleInstanceEntity } = this.props;
      const entity = {
        ...scheduleInstanceEntity,
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
    this.props.history.push('/operation/schedule-instance');
  };

  render() {
    const { scheduleInstanceEntity, vehicles, scheduleTemplates, drivers, routes, bays, loading, updating } = this.props;
    const { isNew } = this.state;

    const { specialNotes } = scheduleInstanceEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="npspClientApp.scheduleInstance.home.createOrEditLabel">{isNew ? 'Create a' : 'Edit'} Schedule Instance</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : scheduleInstanceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="schedule-instance-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    Date
                  </Label>
                  <AvField id="schedule-instance-date" type="date" className="form-control" name="date" />
                </AvGroup>
                <AvGroup>
                  <Label id="scheduledTimeLabel" for="scheduledTime">
                    Scheduled Time
                  </Label>
                  <AvInput
                    id="schedule-instance-scheduledTime"
                    type="time"
                    className="form-control"
                    name="scheduledTime"
                    value={isNew ? null : convert24HourTimeFromServer(this.props.scheduleInstanceEntity.scheduledTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="actualScheduledTimeLabel" for="actualScheduledTime">
                    Actual Scheduled Time
                  </Label>
                  <AvInput
                    id="schedule-instance-actualScheduledTime"
                    type="time"
                    className="form-control"
                    name="actualScheduledTime"
                    value={isNew ? null : convert24HourTimeFromServer(this.props.scheduleInstanceEntity.actualScheduledTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="actualDepartureTimeLabel" for="actualDepartureTime">
                    Actual Departure Time
                  </Label>
                  <AvInput
                    id="schedule-instance-actualDepartureTime"
                    type="time"
                    className="form-control"
                    name="actualDepartureTime"
                    value={isNew ? null : convert24HourTimeFromServer(this.props.scheduleInstanceEntity.actualDepartureTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="specialNotesLabel" for="specialNotes">
                    Special Notes
                  </Label>
                  <AvInput id="schedule-instance-specialNotes" type="textarea" name="specialNotes" />
                </AvGroup>
                <AvGroup>
                  <Label id="scheduleStateLabel">Schedule State</Label>
                  <AvInput
                    id="schedule-instance-scheduleState"
                    type="select"
                    className="form-control"
                    name="scheduleState"
                    value={(!isNew && scheduleInstanceEntity.scheduleState) || 'DEPARTED'}
                  >
                    <option value="DEPARTED">DEPARTED</option>
                    <option value="BOARDING">BOARDING</option>
                    <option value="PENDING">PENDING</option>
                    <option value="DELAYED">DELAYED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="vehicle.id">Vehicle</Label>
                  <AvInput id="schedule-instance-vehicle" type="select" className="form-control" name="vehicle.id">
                    <option value="" key="0" />
                    {vehicles
                      ? vehicles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.transportType.typeName} {otherEntity.registrationNumber}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="scheduleTemplate.id">Schedule Template</Label>
                  <AvInput id="schedule-instance-scheduleTemplate" type="select" className="form-control" name="scheduleTemplate.id">
                    <option value="" key="0" />
                    {scheduleTemplates
                      ? scheduleTemplates.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {convertLocalTimeFromServer(otherEntity.startTime)} -
                              &nbsp;{convertLocalTimeFromServer(otherEntity.endTime)}
                              &nbsp;[Route - {otherEntity.route.routeName}]
                              &nbsp;{otherEntity.bay.bayName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="driver.id">Driver</Label>
                  <AvInput id="schedule-instance-driver" type="select" className="form-control" name="driver.id">
                    <option value="" key="0" />
                    {drivers
                      ? drivers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.driverName} {otherEntity.licenseNumber}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="route.id">Route</Label>
                  <AvInput id="schedule-instance-route" type="select" className="form-control" name="route.id">
                    <option value="" key="0" />
                    {routes
                      ? routes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.routeName} {otherEntity.routeLocations[0].location.locationName} -
                              &nbsp;{otherEntity.routeLocations[otherEntity.routeLocations.length - 1].location.locationName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="bay.id">Bay</Label>
                  <AvInput id="schedule-instance-bay" type="select" className="form-control" name="bay.id">
                    <option value="" key="0" />
                    {bays
                      ? bays.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.bayName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/operation/schedule-instance" replace color="info">
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
  scheduleTemplates: storeState.scheduleTemplate.entities,
  drivers: storeState.driver.entities,
  routes: storeState.route.entities,
  bays: storeState.bay.entities,
  scheduleInstanceEntity: storeState.scheduleInstance.entity,
  loading: storeState.scheduleInstance.loading,
  updating: storeState.scheduleInstance.updating,
  updateSuccess: storeState.scheduleInstance.updateSuccess
});

const mapDispatchToProps = {
  getVehicles,
  getScheduleTemplates,
  getDrivers,
  getRoutes,
  getBays,
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
)(ScheduleInstanceUpdate);
