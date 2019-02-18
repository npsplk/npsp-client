import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './location-type.reducer';
import { ILocationType } from 'app/shared/model/location-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LocationTypeDetail extends React.Component<ILocationTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { locationTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            LocationType [<b>{locationTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="typeName">Type Name</span>
            </dt>
            <dd>{locationTypeEntity.typeName}</dd>
            <dt>
              <span id="metaCode">Meta Code</span>
            </dt>
            <dd>{locationTypeEntity.metaCode}</dd>
          </dl>
          <Button tag={Link} to="/entity/location-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/location-type/${locationTypeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ locationType }: IRootState) => ({
  locationTypeEntity: locationType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationTypeDetail);
