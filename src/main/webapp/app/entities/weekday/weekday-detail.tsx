import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './weekday.reducer';
import { IWeekday } from 'app/shared/model/weekday.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWeekdayDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class WeekdayDetail extends React.Component<IWeekdayDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { weekdayEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Weekday [<b>{weekdayEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="weekday">Weekday</span>
            </dt>
            <dd>{weekdayEntity.weekday}</dd>
          </dl>
          <Button tag={Link} to="/config/weekday" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/config/weekday/${weekdayEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ weekday }: IRootState) => ({
  weekdayEntity: weekday.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekdayDetail);
