import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './route.reducer';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { getEntities as getRouteLocations } from 'app/entities/route-location/route-location.reducer';
import { IRoute } from 'app/shared/model/route.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRouteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRouteUpdateState {
  isNew: boolean;
  idsrouteLocation: any[];
}

export class RouteUpdate extends React.Component<IRouteUpdateProps, IRouteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      idsrouteLocation: []
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
    this.props.getRouteLocations();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { routeEntity } = this.props;
      const entity = {
        ...routeEntity,
        ...values,
        routeLocations: mapIdList(values.routeLocations),
        locations: mapIdList(values.locations)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/config/route');
  };

  render() {
    const { routeEntity, loading, updating, routeLocations, locations } = this.props;
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
                    <AvInput id="route-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="routeNameLabel" for="routeName">
                    Route Name
                  </Label>
                  <AvField id="route-routeName" type="text" name="routeName" />
                </AvGroup>
                <AvGroup>
                  <Label id="routeNumberLabel" for="routeNumber">
                    Route Number
                  </Label>
                  <AvField id="route-routeNumber" type="text" name="routeNumber" />
                </AvGroup>
                  <AvGroup>
                      <Label for="route-locations">Route Locations</Label>
                      <Row className="justify-content-center">
                          <Col md="6">
                          <AvInput id="location" type="select" className="form-control" name="location.id">
                              {locations
                                  ? locations.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                          {otherEntity.locationName}
                                      </option>
                                  ))
                                  : null}
                          </AvInput>
                          </Col>
                          <Col md="1">
                              <Button id="add-location" replace color="info">
                                  <FontAwesomeIcon icon="plus" />&nbsp;
                                  <span className="d-none d-md-inline">Add</span>
                              </Button>
                          </Col>
                          <Col md="1">
                              <Button id="remove-location" replace color="danger">
                                  <FontAwesomeIcon icon="trash" />&nbsp;
                                  <span className="d-none d-md-inline">Remove</span>
                              </Button>
                          </Col>
                      </Row>
                      <AvInput
                          id="route-route-location"
                          type="select"
                          multiple
                          className="form-control"
                          name="route-locations"
                          value={routeLocations && routeLocations.map(e => e.id)}
                      >
                          {routeLocations
                              ? routeLocations.map(otherEntity => (
                                  <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.sequenceNumber} - {otherEntity.location.locationName}
                                  </option>
                              ))
                              : null}
                      </AvInput>
                  </AvGroup>
                <Button tag={Link} id="cancel-save" to="/config/route" replace color="info">
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
  routeEntity: storeState.route.entity,
  loading: storeState.route.loading,
  updating: storeState.route.updating,
  updateSuccess: storeState.route.updateSuccess,
  routeLocations: storeState.routeLocation.entities,
  locations: storeState.location.entities
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  getLocations,
  getRouteLocations,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteUpdate);
