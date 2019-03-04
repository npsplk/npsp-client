import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DriverDetail extends React.Component<IDriverDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { driverEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Driver [<b>{driverEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="driverName">Driver Name</span>
            </dt>
            <dd>{driverEntity.driverName}</dd>
            <dt>
              <span id="contactNumber">Contact Number</span>
            </dt>
            <dd>{driverEntity.contactNumber}</dd>
            <dt>
              <span id="dateOfBirth">Date Of Birth</span>
            </dt>
            <dd>
              <TextFormat value={driverEntity.dateOfBirth} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="address">Address</span>
            </dt>
            <dd>{driverEntity.address}</dd>
            <dt>
              <span id="licenseNumber">License Number</span>
            </dt>
            <dd>{driverEntity.licenseNumber}</dd>
            <dt>
              <span id="licenseExpiryDate">License Expiry Date</span>
            </dt>
            <dd>
              <TextFormat value={driverEntity.licenseExpiryDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/config/driver" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/config/driver/${driverEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ driver }: IRootState) => ({
  driverEntity: driver.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverDetail);
