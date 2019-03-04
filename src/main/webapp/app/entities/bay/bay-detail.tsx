import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bay.reducer';
import { IBay } from 'app/shared/model/bay.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBayDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BayDetail extends React.Component<IBayDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bayEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Bay [<b>{bayEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="bayName">Bay Name</span>
            </dt>
            <dd>{bayEntity.bayName}</dd>
            <dt>
              <span id="bindingAddress">Binding Address</span>
            </dt>
            <dd>{bayEntity.bindingAddress}</dd>
          </dl>
          <Button tag={Link} to="/config/bay" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/config/bay/${bayEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ bay }: IRootState) => ({
  bayEntity: bay.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BayDetail);
