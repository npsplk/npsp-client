import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRoute } from 'app/shared/model/route.model';
import { getEntities as getRoutes } from 'app/entities/route/route.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { IWeekday } from 'app/shared/model/weekday.model';
import { getEntities as getWeekdays } from 'app/entities/weekday/weekday.reducer';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';
import { getEntities as getVehicleFacilities } from 'app/entities/vehicle-facility/vehicle-facility.reducer';
import { getEntity, updateEntity, createEntity, reset } from './schedule.reducer';
import { ISchedule } from 'app/shared/model/schedule.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IScheduleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IScheduleUpdateState {
  isNew: boolean;
  idsweekdays: any[];
  idsvehicleFacility: any[];
  routeId: string;
  startLocationId: string;
  endLocationId: string;
}

export class ScheduleUpdate extends React.Component<IScheduleUpdateProps, IScheduleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsweekdays: [],
      idsvehicleFacility: [],
      routeId: '0',
      startLocationId: '0',
      endLocationId: '0',
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

    this.props.getRoutes();
    this.props.getLocations();
    this.props.getWeekdays();
    this.props.getVehicleFacilities();
  }

  saveEntity = (event, errors, values) => {
    values.startTime = convertDateTimeToServer(values.startTime);
    values.endTime = convertDateTimeToServer(values.endTime);

    if (errors.length === 0) {
      const { scheduleEntity } = this.props;
      const entity = {
        ...scheduleEntity,
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
    this.props.history.push('/operation/schedule');
  };

  render() {
    const { scheduleEntity, routes, locations, weekdays, vehicleFacilities, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="npspClientApp.schedule.home.createOrEditLabel">Create or edit a Schedule</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : scheduleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="schedule-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startTimeLabel" for="startTime">
                    Start Time
                  </Label>
                  <AvInput
                    id="schedule-startTime"
                    type="datetime-local"
                    className="form-control"
                    name="startTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.scheduleEntity.startTime)}
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
                    id="schedule-endTime"
                    type="datetime-local"
                    className="form-control"
                    name="endTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.scheduleEntity.endTime)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="route.id">Route</Label>
                  <AvInput id="schedule-route" type="select" className="form-control" name="route.id">
                    <option value="" key="0" />
                    {routes
                      ? routes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.routeName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="startLocation.id">Start Location</Label>
                  <AvInput id="schedule-startLocation" type="select" className="form-control" name="startLocation.id">
                    <option value="" key="0" />
                    {locations
                      ? locations.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                                {otherEntity.locationName ? otherEntity.locationName : '< unnamed location >'}, {otherEntity.locationType ? otherEntity.locationType.typeName : ''},
                                lon: {otherEntity.longitude}, lat: {otherEntity.latitude},
                            </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="endLocation.id">End Location</Label>
                  <AvInput id="schedule-endLocation" type="select" className="form-control" name="endLocation.id">
                    <option value="" key="0" />
                    {locations
                      ? locations.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.locationName ? otherEntity.locationName : '< unnamed location >'}, {otherEntity.locationType ? otherEntity.locationType.typeName : ''},
                              lon: {otherEntity.longitude}, lat: {otherEntity.latitude},
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="weekdays">Weekdays</Label>
                  <AvInput
                    id="schedule-weekdays"
                    type="select"
                    multiple
                    className="form-control"
                    name="weekdays"
                    value={scheduleEntity.weekdays && scheduleEntity.weekdays.map(e => e.id)}
                  >
                    <option value="" key="0" />
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
                    id="schedule-vehicleFacility"
                    type="select"
                    multiple
                    className="form-control"
                    name="vehicleFacilities"
                    value={scheduleEntity.vehicleFacilities && scheduleEntity.vehicleFacilities.map(e => e.id)}
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
                <Button tag={Link} id="cancel-save" to="/operation/schedule" replace color="info">
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
  routes: storeState.route.entities,
  locations: storeState.location.entities,
  weekdays: storeState.weekday.entities,
  vehicleFacilities: storeState.vehicleFacility.entities,
  scheduleEntity: storeState.schedule.entity,
  loading: storeState.schedule.loading,
  updating: storeState.schedule.updating,
  updateSuccess: storeState.schedule.updateSuccess
});

const mapDispatchToProps = {
  getRoutes,
  getLocations,
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
)(ScheduleUpdate);
