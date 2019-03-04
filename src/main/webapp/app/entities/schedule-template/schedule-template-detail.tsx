import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './schedule-template.reducer';
import { IScheduleTemplate } from 'app/shared/model/schedule-template.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_TIME_FORMAT } from 'app/config/constants';

export interface IScheduleTemplateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ScheduleTemplateDetail extends React.Component<IScheduleTemplateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { scheduleTemplateEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ScheduleTemplate [<b>{scheduleTemplateEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="startTime">Start Time</span>
            </dt>
            <dd>
              <TextFormat value={scheduleTemplateEntity.startTime} type="date" format={APP_LOCAL_TIME_FORMAT} />
            </dd>
            <dt>
              <span id="endTime">End Time</span>
            </dt>
            <dd>
              <TextFormat value={scheduleTemplateEntity.endTime} type="date" format={APP_LOCAL_TIME_FORMAT} />
            </dd>
            <dt>
              <span id="isActive">Is Active</span>
            </dt>
            <dd>{scheduleTemplateEntity.isActive ? 'Active' : 'Inactive'}</dd>
            <dt>Vehicle</dt>
            <dd>{scheduleTemplateEntity.vehicle ? scheduleTemplateEntity.vehicle.registrationNumber : ''}</dd>
            <dt>Driver</dt>
            <dd>{scheduleTemplateEntity.driver ? scheduleTemplateEntity.driver.driverName : ''}</dd>
            <dt>Route</dt>
            <dd>{scheduleTemplateEntity.route ? scheduleTemplateEntity.route.routeName : ''}</dd>
            <dt>Bay</dt>
            <dd>{scheduleTemplateEntity.bay ? scheduleTemplateEntity.bay.bayName : ''}</dd>
            <dt>Weekday</dt>
            <dd>
              {scheduleTemplateEntity.weekdays
                ? scheduleTemplateEntity.weekdays.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.weekday}</a>
                      {i === scheduleTemplateEntity.weekdays.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Vehicle Facility</dt>
            <dd>
              {scheduleTemplateEntity.vehicleFacilities
                ? scheduleTemplateEntity.vehicleFacilities.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.facilityName}</a>
                      {i === scheduleTemplateEntity.vehicleFacilities.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/operation/schedule-template" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/operation/schedule-template/${scheduleTemplateEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ scheduleTemplate }: IRootState) => ({
  scheduleTemplateEntity: scheduleTemplate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleTemplateDetail);
