import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TripDetail extends React.Component<ITripDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tripEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Trip [<b>{tripEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="startDate">Start Date</span>
            </dt>
            <dd>
              <TextFormat value={tripEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="startTime">Start Time</span>
            </dt>
            <dd>
              <TextFormat value={tripEntity.startTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endTime">End Time</span>
            </dt>
            <dd>
              <TextFormat value={tripEntity.endTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Vehicle</dt>
            <dd>{tripEntity.vehicle ? tripEntity.vehicle.id : ''}</dd>
            <dt>Schedule</dt>
            <dd>{tripEntity.schedule ? tripEntity.schedule.id : ''}</dd>
            <dt>Parking Slot</dt>
            <dd>{tripEntity.parkingSlot ? tripEntity.parkingSlot.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/trip" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/trip/${tripEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ trip }: IRootState) => ({
  tripEntity: trip.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripDetail);
