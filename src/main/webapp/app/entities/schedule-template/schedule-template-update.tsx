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
import { getEntities as getVehicles } from 'app/entities/vehicle/vehicle.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { getEntities as getDrivers } from 'app/entities/driver/driver.reducer';
import { IRoute } from 'app/shared/model/route.model';
import { getEntities as getRoutes } from 'app/entities/route/route.reducer';
import { IBay } from 'app/shared/model/bay.model';
import { getEntities as getBays } from 'app/entities/bay/bay.reducer';
import { IWeekday } from 'app/shared/model/weekday.model';
import { getEntities as getWeekdays } from 'app/entities/weekday/weekday.reducer';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';
import { getEntities as getVehicleFacilities } from 'app/entities/vehicle-facility/vehicle-facility.reducer';
import { getEntity, updateEntity, createEntity, reset } from './schedule-template.reducer';
import { IScheduleTemplate } from 'app/shared/model/schedule-template.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IScheduleTemplateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

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
    values.startTime = convertDateTimeToServer(values.startTime);
    values.endTime = convertDateTimeToServer(values.endTime);

    if (errors.length === 0) {
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

  handleClose = () => {
    this.props.history.push('/entity/schedule-template');
  };

  render() {
    const { scheduleTemplateEntity, vehicles, drivers, routes, bays, weekdays, vehicleFacilities, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="npspClientApp.scheduleTemplate.home.createOrEditLabel">Create or edit a ScheduleTemplate</h2>
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
                    <AvInput id="schedule-template-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startTimeLabel" for="startTime">
                    Start Time
                  </Label>
                  <AvInput
                    id="schedule-template-startTime"
                    type="datetime-local"
                    className="form-control"
                    name="startTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.scheduleTemplateEntity.startTime)}
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
                    type="datetime-local"
                    className="form-control"
                    name="endTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.scheduleTemplateEntity.endTime)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="isActiveLabel" check>
                    <AvInput id="schedule-template-isActive" type="checkbox" className="form-control" name="isActive" />
                    Is Active
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="vehicle.id">Vehicle</Label>
                  <AvInput id="schedule-template-vehicle" type="select" className="form-control" name="vehicle.id">
                    <option value="" key="0" />
                    {vehicles
                      ? vehicles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="driver.id">Driver</Label>
                  <AvInput id="schedule-template-driver" type="select" className="form-control" name="driver.id">
                    <option value="" key="0" />
                    {drivers
                      ? drivers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="route.id">Route</Label>
                  <AvInput id="schedule-template-route" type="select" className="form-control" name="route.id">
                    <option value="" key="0" />
                    {routes
                      ? routes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="bay.id">Bay</Label>
                  <AvInput id="schedule-template-bay" type="select" className="form-control" name="bay.id">
                    <option value="" key="0" />
                    {bays
                      ? bays.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
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
                    <option value="" key="0" />
                    {weekdays
                      ? weekdays.map(otherEntity => (
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
                    id="schedule-template-vehicleFacility"
                    type="select"
                    multiple
                    className="form-control"
                    name="vehicleFacilities"
                    value={scheduleTemplateEntity.vehicleFacilities && scheduleTemplateEntity.vehicleFacilities.map(e => e.id)}
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
                <Button tag={Link} id="cancel-save" to="/entity/schedule-template" replace color="info">
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
