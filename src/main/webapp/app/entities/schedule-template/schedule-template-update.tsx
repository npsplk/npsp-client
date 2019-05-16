import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicle } from 'app/shared/model/vehicle.model';
import { getAllEntities as getVehicles } from 'app/entities/vehicle/vehicle.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { getAllEntities as getDrivers } from 'app/entities/driver/driver.reducer';
import { IRoute } from 'app/shared/model/route.model';
import { getAllEntities as getRoutes } from 'app/entities/route/route.reducer';
import { IBay } from 'app/shared/model/bay.model';
import { getAllEntities as getBays } from 'app/entities/bay/bay.reducer';
import { IWeekday } from 'app/shared/model/weekday.model';
import { getEntities as getWeekdays } from 'app/entities/weekday/weekday.reducer';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';
import { getAllEntities as getVehicleFacilities } from 'app/entities/vehicle-facility/vehicle-facility.reducer';
import { getEntity, updateEntity, createEntity, reset } from './schedule-template.reducer';
import { IScheduleTemplate } from 'app/shared/model/schedule-template.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer, convert24HourTimeFromServer, convertLocalTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import Select from 'react-select';

export interface IScheduleTemplateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface IScheduleTemplateUpdateState {
  isNew: boolean;
  idsweekday: any[];
  idsvehicleFacility: any[];
  vehicleId: string;
  driverId: string;
  routeId: string;
  bayId: string;
}

export class ScheduleTemplateUpdate extends React.Component<IScheduleTemplateUpdateProps, IScheduleTemplateUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsweekday: [],
      idsvehicleFacility: [],
      vehicleId: '0',
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
    this.props.getDrivers();
    this.props.getRoutes();
    this.props.getBays();
    this.props.getWeekdays();
    this.props.getVehicleFacilities();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      values.startTime = convertDateTimeToServer('2019-02-08T' + values.startTime);
      values.endTime = convertDateTimeToServer('2019-02-08T' + values.endTime);
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
      const { scheduleTemplateEntity } = this.props;
      const entity = {
        ...scheduleTemplateEntity,
        ...values,
        weekdays: mapIdList(values.weekdays),
        vehicleFacilities: mapIdList(values.vehicleFacilities)
      };
      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
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

  handleChangeVehicle = prop => {
    this.setState({ vehicleId: prop.value });
  };

  handleClose = () => {
    this.props.history.push('/operation/schedule-template');
  };

  render() {
    const { scheduleTemplateEntity, vehicles, drivers, routes, bays, weekdays, vehicleFacilities, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="npspClientApp.scheduleTemplate.home.createOrEditLabel">{isNew ? 'Create a' : 'Edit'} ScheduleTemplate</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : scheduleTemplateEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="schedule-template-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startTimeLabel" for="startTime">
                    Start Time
                  </Label>
                  <AvInput
                    id="schedule-template-startTime"
                    type="time"
                    className="form-control"
                    name="startTime"
                    value={isNew ? null : convert24HourTimeFromServer(this.props.scheduleTemplateEntity.startTime)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endTimeLabel" for="endTime">
                    End Time
                  </Label>
                  <AvInput
                    id="schedule-template-endTime"
                    type="time"
                    className="form-control"
                    name="endTime"
                    value={isNew ? null : convert24HourTimeFromServer(this.props.scheduleTemplateEntity.endTime)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="isActiveLabel" check>
                    <AvInput id="schedule-template-isActive" type="checkbox" className="form-control" name="isActive"/>
                    Is Active
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="vehicle.id">Vehicle</Label>
                  <Select id="schedule-template-vehicle" name="vehicle.id"
                          onChange={this.handleChangeDriver}
                          defaultValue={
                            scheduleTemplateEntity.vehicle ? {
                              label: scheduleTemplateEntity.vehicle.transportType.typeName + ' ' + scheduleTemplateEntity.vehicle.registrationNumber,
                              value: scheduleTemplateEntity.vehicle.id
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
                  <Label for="driver.id">Driver</Label>
                  <Select id="schedule-template-driver" name="driver.id"
                          onChange={this.handleChangeDriver}
                          defaultValue={
                            scheduleTemplateEntity.driver ? {
                              label: scheduleTemplateEntity.driver.driverName + ' ' + scheduleTemplateEntity.driver.licenseNumber,
                              value: scheduleTemplateEntity.driver.id
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
                  <Select id="schedule-template-route" name="route.id"
                          onChange={this.handleChangeRoute}
                          defaultValue={
                            scheduleTemplateEntity.route ? {
                              label: scheduleTemplateEntity.route.routeName + ' ' +
                                (scheduleTemplateEntity.route.routeLocations[0] ? scheduleTemplateEntity.route.routeLocations[0].location.locationName :
                                  '(location not defined)') + ' - ' +
                                (scheduleTemplateEntity.route.routeLocations[0] ? scheduleTemplateEntity.route.routeLocations
                                    [scheduleTemplateEntity.route.routeLocations.length - 1].location.locationName
                                  : '(location not defined)'),
                              value: scheduleTemplateEntity.route.id
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
                  <Select id="schedule-template-bay" name="bay.id"
                          onChange={this.handleChangeBay}
                          defaultValue={
                            scheduleTemplateEntity.bay ? {
                              label: scheduleTemplateEntity.bay.bayName,
                              value: scheduleTemplateEntity.bay.id
                            } : null}
                          options={
                            bays
                              ? bays.map(otherEntity => (
                                { label: otherEntity.bayName , value: otherEntity.id }
                              ))
                              : []
                          }/>
                </AvGroup>
                <AvGroup>
                  <Label for="weekdays">Weekday</Label>
                  <AvInput
                    id="schedule-template-weekday"
                    type="select"
                    multiple
                    className="form-control"
                    name="weekdays"
                    value={scheduleTemplateEntity.weekdays && scheduleTemplateEntity.weekdays.map(e => e.id)}
                  >
                    <option value="" key="0"/>
                    {weekdays
                      ? weekdays.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.weekday}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="vehicleFacilities">Vehicle Facility</Label>
                  <AvInput
                    id="schedule-template-vehicleFacility"
                    type="select"
                    multiple
                    className="form-control"
                    name="vehicleFacilities"
                    value={scheduleTemplateEntity.vehicleFacilities && scheduleTemplateEntity.vehicleFacilities.map(e => e.id)}
                  >
                    <option value="" key="0"/>
                    {vehicleFacilities
                      ? vehicleFacilities.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.facilityName}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/operation/schedule-template" replace color="info">
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
  drivers: storeState.driver.entities,
  routes: storeState.route.entities,
  bays: storeState.bay.entities,
  weekdays: storeState.weekday.entities,
  vehicleFacilities: storeState.vehicleFacility.entities,
  scheduleTemplateEntity: storeState.scheduleTemplate.entity,
  loading: storeState.scheduleTemplate.loading,
  updating: storeState.scheduleTemplate.updating,
  updateSuccess: storeState.scheduleTemplate.updateSuccess
});

const mapDispatchToProps = {
  getVehicles,
  getDrivers,
  getRoutes,
  getBays,
  getWeekdays,
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
)(ScheduleTemplateUpdate);
