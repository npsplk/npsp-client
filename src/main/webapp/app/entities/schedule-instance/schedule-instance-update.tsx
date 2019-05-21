import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getAllEntities as getVehicles } from 'app/entities/vehicle/vehicle.reducer';
import { getAllEntities as getScheduleTemplates } from 'app/entities/schedule-template/schedule-template.reducer';
import { getAllEntities as getDrivers } from 'app/entities/driver/driver.reducer';
import { getAllEntities as getRoutes } from 'app/entities/route/route.reducer';
import { getAllEntities as getBays } from 'app/entities/bay/bay.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './schedule-instance.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer, convert24HourTimeFromServer, convertToDashedDate, convertLocalTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IScheduleInstanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

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
      if (this.state.scheduleTemplateId !== '0') {
        values.scheduleTemplate = { id: this.state.scheduleTemplateId };
      }
      if (this.state.driverId !== '0') {
        values.driver = { id: this.state.driverId };
      }
      if (this.state.vehicleId !== '0') {
        values.vehicle = { id: this.state.vehicleId };
      }
      if (this.state.routeId !== '0') {
        values.route = { id: this.state.routeId };
      }
      if (this.state.bayId !== '0') {
        values.bay = { id: this.state.bayId };
      }
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

  handleChangeVehicle = prop => {
    this.setState({ vehicleId: prop.value });
  };

  handleChangeScheduleTemplate = prop => {
    this.setState({ scheduleTemplateId: prop.value });
  };

  handleChangeDriver = prop => {
    this.setState({ driverId: prop.value });
  };

  handleChangeRoute = prop => {
    this.setState({ routeId: prop.value });
  };

  handleChangeBay = prop => {
    this.setState({ bayId: prop.value });
  };

  handleClose = () => {
    // this.props.history.push('/operation/schedule-instance');
    this.props.history.goBack();
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
                    <AvInput id="schedule-instance-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    Date
                  </Label>
                  <AvField id="schedule-instance-date" type="date" className="form-control" name="date"/>
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
                  <AvInput id="schedule-instance-specialNotes" type="textarea" name="specialNotes"/>
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
                  <Select id="schedule-instance-vehicle" name="vehicle.id"
                          onChange={this.handleChangeDriver}
                          defaultValue={
                            scheduleInstanceEntity.vehicle ? {
                              label: scheduleInstanceEntity.vehicle.transportType.typeName + ' ' + scheduleInstanceEntity.vehicle.registrationNumber,
                              value: scheduleInstanceEntity.vehicle.id
                            } : null}
                          options={
                            vehicles
                              ? vehicles.map(otherEntity => (
                                { label: otherEntity.transportType.typeName + ' ' + otherEntity.registrationNumber, value: otherEntity.id }
                              ))
                              : []
                          }/>
                </AvGroup>
                <AvGroup>
                  <Label for="scheduleTemplate.id">Schedule Template</Label>
                  <Select id="schedule-instance-scheduleTemplate" name="scheduleTemplate.id"
                          onChange={this.handleChangeBay}
                          defaultValue={
                            scheduleInstanceEntity.bay ? {
                              label: convertLocalTimeFromServer(scheduleInstanceEntity.scheduleTemplate.startTime) + ' - ' +
                                convertLocalTimeFromServer(scheduleInstanceEntity.scheduleTemplate.endTime) + ' [Route - ' +
                                scheduleInstanceEntity.scheduleTemplate.route.routeName + '] ' +
                                scheduleInstanceEntity.scheduleTemplate.bay.bayName,
                              value: scheduleInstanceEntity.scheduleTemplate.id
                            } : null}
                          options={
                            scheduleTemplates
                              ? scheduleTemplates.map(otherEntity => (
                                {
                                  label: convertLocalTimeFromServer(otherEntity.startTime) + ' - ' +
                                    convertLocalTimeFromServer(otherEntity.endTime) + ' [Route - ' +
                                    otherEntity.route.routeName + '] ' +
                                    otherEntity.bay.bayName,
                                  value: otherEntity.id
                                }
                              ))
                              : []
                          }/>
                </AvGroup>
                <AvGroup>
                  <Label for="driver.id">Driver</Label>
                  <Select id="schedule-instance-driver" name="driver.id"
                          onChange={this.handleChangeDriver}
                          defaultValue={
                            scheduleInstanceEntity.driver ? {
                              label: scheduleInstanceEntity.driver.driverName + ' ' + scheduleInstanceEntity.driver.licenseNumber,
                              value: scheduleInstanceEntity.driver.id
                            } : null}
                          options={
                            drivers
                              ? drivers.map(otherEntity => (
                                { label: otherEntity.driverName + ' ' + otherEntity.licenseNumber, value: otherEntity.id }
                              ))
                              : []
                          }/>
                </AvGroup>
                <AvGroup>
                  <Label for="route.id">Route</Label>
                  <Select id="schedule-instance-route" name="route.id"
                          onChange={this.handleChangeRoute}
                          defaultValue={
                            scheduleInstanceEntity.route ? {
                              label: scheduleInstanceEntity.route.routeName + ' ' +
                                (scheduleInstanceEntity.route.routeLocations[0] ? scheduleInstanceEntity.route.routeLocations[0].location.locationName :
                                  '(location not defined)') + ' - ' +
                                (scheduleInstanceEntity.route.routeLocations[0] ? scheduleInstanceEntity.route.routeLocations
                                    [scheduleInstanceEntity.route.routeLocations.length - 1].location.locationName
                                  : '(location not defined)'),
                              value: scheduleInstanceEntity.route.id
                            } : null}
                          options={
                            routes
                              ? routes.map(otherEntity => (
                                {
                                  label: otherEntity.routeName + ' ' +
                                    (otherEntity.routeLocations[0] ? otherEntity.routeLocations[0].location.locationName : '(location not defined)') + ' - ' +
                                    (otherEntity.routeLocations[0] ? otherEntity.routeLocations[otherEntity.routeLocations.length - 1].location.locationName
                                      : '(location not defined)')
                                  , value: otherEntity.id
                                }
                              ))
                              : []
                          }/>
                </AvGroup>
                <AvGroup>
                  <Label for="bay.id">Bay</Label>
                  <Select id="schedule-instance-bay" name="bay.id"
                          onChange={this.handleChangeBay}
                          defaultValue={
                            scheduleInstanceEntity.bay ? {
                              label: scheduleInstanceEntity.bay.bayName,
                              value: scheduleInstanceEntity.bay.id
                            } : null}
                          options={
                            bays
                              ? bays.map(otherEntity => (
                                { label: otherEntity.bayName, value: otherEntity.id }
                              ))
                              : []
                          }/>
                </AvGroup>
                <Button id="cancel-save" onClick={this.handleClose} replace color="info">
                  <FontAwesomeIcon icon="arrow-left"/>&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save"/>&nbsp; Save
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
