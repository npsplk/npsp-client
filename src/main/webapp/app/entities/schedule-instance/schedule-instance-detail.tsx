import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './schedule-instance.reducer';
import { IScheduleInstance } from 'app/shared/model/schedule-instance.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, APP_LOCAL_TIME_FORMAT } from 'app/config/constants';

export interface IScheduleInstanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ScheduleInstanceDetail extends React.Component<IScheduleInstanceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { scheduleInstanceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Schedule Instance [<b>{scheduleInstanceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">Date</span>
            </dt>
            <dd>
              <TextFormat value={scheduleInstanceEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="scheduledTime">Scheduled Time</span>
            </dt>
            <dd>
              <TextFormat value={scheduleInstanceEntity.scheduledTime} type="date" format={APP_LOCAL_TIME_FORMAT} />
            </dd>
            <dt>
              <span id="actualScheduledTime">Actual Scheduled Time</span>
            </dt>
            <dd>
              <TextFormat value={scheduleInstanceEntity.actualScheduledTime} type="date" format={APP_LOCAL_TIME_FORMAT} />
            </dd>
            <dt>
              <span id="actualDepartureTime">Actual Departure Time</span>
            </dt>
            <dd>
              <TextFormat value={scheduleInstanceEntity.actualDepartureTime} type="date" format={APP_LOCAL_TIME_FORMAT} />
            </dd>
            <dt>
              <span id="specialNotes">Special Notes</span>
            </dt>
            <dd>{scheduleInstanceEntity.specialNotes}</dd>
            <dt>
              <span id="scheduleState">Schedule State</span>
            </dt>
            <dd>{scheduleInstanceEntity.scheduleState}</dd>
            <dt>Vehicle</dt>
            <dd>{scheduleInstanceEntity.vehicle ? scheduleInstanceEntity.vehicle.registrationNumber : ''}</dd>
            <dt>Schedule Template</dt>
            <dd>{scheduleInstanceEntity.scheduleTemplate ? scheduleInstanceEntity.scheduleTemplate.id : ''}</dd>
            <dt>Driver</dt>
            <dd>{scheduleInstanceEntity.driver ? scheduleInstanceEntity.driver.driverName : ''}</dd>
            <dt>Route</dt>
            <dd>{scheduleInstanceEntity.route ? scheduleInstanceEntity.route.routeName : ''}</dd>
            <dt>Bay</dt>
            <dd>{scheduleInstanceEntity.bay ? scheduleInstanceEntity.bay.bayName : ''}</dd>
          </dl>
          <Button tag={Link} to="/operation/schedule-instance" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/operation/schedule-instance/${scheduleInstanceEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ scheduleInstance }: IRootState) => ({
  scheduleInstanceEntity: scheduleInstance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleInstanceDetail);
