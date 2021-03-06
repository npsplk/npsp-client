import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset, selectLocation, addRouteLocation, removeRouteLocations, selectRouteLocations } from './route.reducer';
import { getAllEntities as getLocations } from 'app/entities/location/location.reducer';
import { IRouteLocation } from 'app/shared/model/route-location.model';
import route from 'app/entities/route/route';

// tslint:disable-next-line:no-unused-variable

export interface IRouteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface IRouteUpdateState {
  isNew: boolean;
}

export class RouteUpdate extends React.Component<IRouteUpdateProps, IRouteUpdateState> {
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

    this.props.getLocations();

  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const newRouteLocations = [];
      const routeLocations = this.props.routeLocations;
      // assign sequence numbers to route locations in order
      let i = 1;
      routeLocations.forEach(routeLocation => {
        routeLocation.id = null;
        routeLocation.sequenceNumber = i++;
        newRouteLocations.push(routeLocation);
      });
      values.routeLocations = newRouteLocations;

      const { routeEntity } = this.props;
      const entity = {
        ...routeEntity,
        ...values
      };
      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  addRouteLocation = () => {
    const locationObject = this.props.selectedLocationOption.location;
    const routeEntity = this.props.routeEntity;

    this.props.addRouteLocation({
      id: 'new-' + locationObject.id,
      sequenceNumber: 0,
      location: locationObject,
      route: { id: routeEntity.id, routeName: routeEntity.routeName, routeNumber: routeEntity.routeNumber }
    });
  };

  removeRouteLocations = () => {
    this.props.removeRouteLocations(this.props.selectedRouteLocationOptions);
  };

  selectLocation = selectedOption => {
    this.props.selectLocation(selectedOption);
  };

  selectRouteLocations = SelectEvent => {
    const selectedIndexes = [];
    for (const option of SelectEvent.target.selectedOptions) {
      selectedIndexes.push(option.value);
    }
    this.props.selectRouteLocations(selectedIndexes);
  };

  handleClose = () => {
    this.props.history.push('/config/route');
  };

  render() {
    const { routeEntity, loading, updating, routeLocations, locations, selectedLocationOption } = this.props;
    const { isNew } = this.state;
    return (

      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="npspClientApp.route.home.createOrEditLabel">{isNew ? 'Create a' : 'Edit'} Route</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : routeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="route-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="routeNameLabel" for="routeName">
                    Route Name
                  </Label>
                  <AvField id="route-routeName" type="text" name="routeName"/>
                </AvGroup>
                <AvGroup>
                  <Label id="routeNumberLabel" for="routeNumber">
                    Route Number
                  </Label>
                  <AvField id="route-routeNumber" type="text" name="routeNumber"/>
                </AvGroup>
                <AvGroup>
                  <Label for="route-locations">Route Locations</Label>
                  <Row className="justify-content-center">
                    <Col md="6">
                      <Select
                        value={selectedLocationOption}
                        onChange={this.selectLocation}
                        options={locations ? locations.map(otherEntity => (
                          { value: otherEntity.id.toString(), label: otherEntity.locationName, location: otherEntity })) : []}
                      />
                    </Col>
                    <Col md="2">
                      <div className="btn-group flex-btn-group-container">
                        <Button onClick={this.addRouteLocation} id="add-location" replace color="info">
                          <FontAwesomeIcon icon="plus"/>&nbsp;
                        </Button>
                        <Button onClick={this.removeRouteLocations} id="remove-location" replace color="danger">
                          <FontAwesomeIcon icon="trash"/>&nbsp;
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <AvInput
                    id="route-route-location"
                    type="select"
                    multiple
                    className="form-control"
                    name="routeLocations"
                    value={routeLocations}
                    onChange={this.selectRouteLocations}
                  >
                    {routeLocations
                      ? routeLocations.map((otherEntity, index) => (
                        <option value={otherEntity.id} key={index}>
                          {otherEntity.location.locationName}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/config/route" replace color="info">
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
  routeEntity: storeState.route.entity,
  loading: storeState.route.loading,
  updating: storeState.route.updating,
  updateSuccess: storeState.route.updateSuccess,
  routeLocations: storeState.route.entity.routeLocations,
  locations: storeState.location.entities,
  selectedLocationOption: storeState.route.selectedLocationOption,
  selectedRouteLocationOptions: storeState.route.selectedRouteLocationOptions
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  getLocations,
  addRouteLocation,
  removeRouteLocations,
  selectLocation,
  selectRouteLocations,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteUpdate);
