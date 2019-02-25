import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vehicle-owner.reducer';
import { IVehicleOwner } from 'app/shared/model/vehicle-owner.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleOwnerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVehicleOwnerUpdateState {
  isNew: boolean;
}

export class VehicleOwnerUpdate extends React.Component<IVehicleOwnerUpdateProps, IVehicleOwnerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { vehicleOwnerEntity } = this.props;
      const entity = {
        ...vehicleOwnerEntity,
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
    this.props.history.push('/config/vehicle-owner');
  };

  render() {
    const { vehicleOwnerEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="npspClientApp.vehicleOwner.home.createOrEditLabel">{isNew ? 'Create a' : 'Edit'} VehicleOwner</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : vehicleOwnerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="vehicle-owner-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="ownerNameLabel" for="ownerName">
                    Owner Name
                  </Label>
                  <AvField
                    id="vehicle-owner-ownerName"
                    type="text"
                    name="ownerName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="contactNumberLabel" for="contactNumber">
                    Contact Number
                  </Label>
                  <AvField
                    id="vehicle-owner-contactNumber"
                    type="text"
                    name="contactNumber"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="address">
                    Address
                  </Label>
                  <AvField id="vehicle-owner-address" type="text" name="address" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/config/vehicle-owner" replace color="info">
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
  vehicleOwnerEntity: storeState.vehicleOwner.entity,
  loading: storeState.vehicleOwner.loading,
  updating: storeState.vehicleOwner.updating,
  updateSuccess: storeState.vehicleOwner.updateSuccess
});

const mapDispatchToProps = {
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
)(VehicleOwnerUpdate);
