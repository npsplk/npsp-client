import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IParkingArea } from 'app/shared/model/parking-area.model';
import { getEntities as getParkingAreas } from 'app/entities/parking-area/parking-area.reducer';
import { getEntity, updateEntity, createEntity, reset } from './parking-slot.reducer';
import { IParkingSlot } from 'app/shared/model/parking-slot.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IParkingSlotUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IParkingSlotUpdateState {
  isNew: boolean;
  parkingAreaId: string;
}

export class ParkingSlotUpdate extends React.Component<IParkingSlotUpdateProps, IParkingSlotUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      parkingAreaId: '0',
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

    this.props.getParkingAreas();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { parkingSlotEntity } = this.props;
      const entity = {
        ...parkingSlotEntity,
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
    this.props.history.push('/config/parking-slot');
  };

  render() {
    const { parkingSlotEntity, parkingAreas, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="npspClientApp.parkingSlot.home.createOrEditLabel">{isNew ? 'Create a' : 'Edit'} ParkingSlot</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : parkingSlotEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="parking-slot-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="slotNumberLabel" for="slotNumber">
                    Slot Number
                  </Label>
                  <AvField id="parking-slot-slotNumber" type="text" name="slotNumber" />
                </AvGroup>
                <AvGroup>
                  <Label for="parkingArea.id">Parking Area</Label>
                  <AvInput id="parking-slot-parkingArea" type="select" className="form-control" name="parkingArea.id">
                    <option value="" key="0" />
                    {parkingAreas
                      ? parkingAreas.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/config/parking-slot" replace color="info">
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
  parkingAreas: storeState.parkingArea.entities,
  parkingSlotEntity: storeState.parkingSlot.entity,
  loading: storeState.parkingSlot.loading,
  updating: storeState.parkingSlot.updating,
  updateSuccess: storeState.parkingSlot.updateSuccess
});

const mapDispatchToProps = {
  getParkingAreas,
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
)(ParkingSlotUpdate);
