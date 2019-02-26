import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './schedule.reducer';
import { ISchedule } from 'app/shared/model/schedule.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_TIME_FORMAT, APP_LOCAL_DATE_FORMAT, APP_LOCAL_TIME_FORMAT } from 'app/config/constants';

export interface IScheduleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ScheduleDetail extends React.Component<IScheduleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { scheduleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Schedule [<b>{scheduleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="startTime">Start Time</span>
            </dt>
            <dd>
              <TextFormat value={scheduleEntity.startTime} type="date" format={APP_LOCAL_TIME_FORMAT} />
            </dd>
            <dt>
              <span id="endTime">End Time</span>
            </dt>
            <dd>
              <TextFormat value={scheduleEntity.endTime} type="date" format={APP_LOCAL_TIME_FORMAT} />
            </dd>
            <dt>Route</dt>
            <dd>{scheduleEntity.route ? scheduleEntity.route.routeName : ''}</dd>
            <dt>Start Location</dt>
            <dd>{scheduleEntity.startLocation ? scheduleEntity.startLocation.locationName : ''}</dd>
            <dt>End Location</dt>
            <dd>{scheduleEntity.endLocation ? scheduleEntity.endLocation.locationName : ''}</dd>
            <dt>Weekdays</dt>
            <dd>
              {scheduleEntity.weekdays
                ? scheduleEntity.weekdays.map((val, i) => (
                    <span key={val.id}>
                      {val.weekday}
                      {i === scheduleEntity.weekdays.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Vehicle Facility</dt>
            <dd>
              {scheduleEntity.vehicleFacilities
                ? scheduleEntity.vehicleFacilities.map((val, i) => (
                    <span key={val.id}>
                      {val.facilityName}
                      {i === scheduleEntity.vehicleFacilities.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/operation/schedule" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/operation/schedule/${scheduleEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ schedule }: IRootState) => ({
  scheduleEntity: schedule.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDetail);
