import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './parking-slot.reducer';
import { IParkingSlot } from 'app/shared/model/parking-slot.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IParkingSlotDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ParkingSlotDetail extends React.Component<IParkingSlotDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { parkingSlotEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ParkingSlot [<b>{parkingSlotEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="slotNumber">Slot Number</span>
            </dt>
            <dd>{parkingSlotEntity.slotNumber}</dd>
            <dt>Parking Area</dt>
            <dd>{parkingSlotEntity.parkingArea ? parkingSlotEntity.parkingArea.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/parking-slot" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/parking-slot/${parkingSlotEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ parkingSlot }: IRootState) => ({
  parkingSlotEntity: parkingSlot.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParkingSlotDetail);
