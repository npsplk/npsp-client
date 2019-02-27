import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRoute } from 'app/shared/model/route.model';
import { getEntities as getRoutes } from 'app/entities/route/route.reducer';
import { getEntity, updateEntity, createEntity, reset } from './route-location.reducer';
import { IRouteLocation } from 'app/shared/model/route-location.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRouteLocationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRouteLocationUpdateState {
  isNew: boolean;
  routeId: string;
}

export class RouteLocationUpdate extends React.Component<IRouteLocationUpdateProps, IRouteLocationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      routeId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { routeLocationEntity } = this.props;
      const entity = {
        ...routeLocationEntity,
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
    this.props.history.push('/entity/route-location');
  };

  render() {
    const { routeLocationEntity, routes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="npspClientApp.routeLocation.home.createOrEditLabel">Create or edit a RouteLocation</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : routeLocationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="route-location-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="sequenceNumberLabel" for="sequenceNumber">
                    Sequence Number
                  </Label>
                  <AvField id="route-location-sequenceNumber" type="string" className="form-control" name="sequenceNumber" />
                </AvGroup>
                <AvGroup>
                  <Label for="route.id">Route</Label>
                  <AvInput id="route-location-route" type="select" className="form-control" name="route.id">
                    <option value="" key="0" />
                    {routes
                      ? routes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/route-location" replace color="info">
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
  routeLocationEntity: storeState.routeLocation.entity,
  loading: storeState.routeLocation.loading,
  updating: storeState.routeLocation.updating,
  updateSuccess: storeState.routeLocation.updateSuccess
});

const mapDispatchToProps = {
  getRoutes,
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
)(RouteLocationUpdate);
