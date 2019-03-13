import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  byteSize,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getOperations } from 'app/entities/schedule-instance/schedule-instance.reducer';
import { IScheduleInstance } from 'app/shared/model/schedule-instance.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, APP_LOCAL_TIME_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IScheduleInstanceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IScheduleInstanceState = IPaginationBaseState;

export class ScheduleInstance extends React.Component<IScheduleInstanceProps, IScheduleInstanceState> {
  state: IScheduleInstanceState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getOperations(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { scheduleInstanceList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="schedule-instance-heading">
          Today's Schedule
          <Link to={`${match.url}operation/schedule-instance/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Schedule Instance
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={this.sort('id')}>
                ID <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={this.sort('date')}>
                Date <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={this.sort('scheduledTime')}>
                Scheduled Time <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={this.sort('actualScheduledTime')}>
                Actual Scheduled Time <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={this.sort('actualDepartureTime')}>
                Actual Departure Time <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={this.sort('scheduleState')}>
                Schedule State <FontAwesomeIcon icon="sort" />
              </th>
              <th>
                Vehicle <FontAwesomeIcon icon="sort" />
              </th>
              <th>
                Route <FontAwesomeIcon icon="sort" />
              </th>
              <th>
                Bay <FontAwesomeIcon icon="sort" />
              </th>
              <th />
            </tr>
            </thead>
            <tbody>
            {scheduleInstanceList.map((scheduleInstance, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}operation/schedule-instance/${scheduleInstance.id}`} color="link" size="sm">
                    {scheduleInstance.id}
                  </Button>
                </td>
                <td>
                  <TextFormat type="date" value={scheduleInstance.date} format={APP_LOCAL_DATE_FORMAT} />
                </td>
                <td>
                  <TextFormat type="date" value={scheduleInstance.scheduledTime} format={APP_LOCAL_TIME_FORMAT} />
                </td>
                <td>
                  <TextFormat type="date" value={scheduleInstance.actualScheduledTime} format={APP_LOCAL_TIME_FORMAT} />
                </td>
                <td>
                  <TextFormat type="date" value={scheduleInstance.actualDepartureTime} format={APP_LOCAL_TIME_FORMAT} />
                </td>
                <td>{scheduleInstance.scheduleState}</td>
                <td>
                  {scheduleInstance.vehicle ? (
                    <Link to={`../config/vehicle/${scheduleInstance.vehicle.id}`}>{scheduleInstance.vehicle.registrationNumber}</Link>
                  ) : (
                    ''
                  )}
                </td>
                <td>
                  {scheduleInstance.route ? <Link to={`../config/route/${scheduleInstance.route.id}`}>{scheduleInstance.route.routeName}</Link> : ''}
                </td>
                <td>{scheduleInstance.bay ? <Link to={`../config/bay/${scheduleInstance.bay.id}`}>{scheduleInstance.bay.bayName}</Link> : ''}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}operation/schedule-instance/${scheduleInstance.id}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                    </Button>
                    <Button tag={Link} to={`${match.url}operation/schedule-instance/${scheduleInstance.id}/edit`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                    </Button>
                    <Button tag={Link} to={`${match.url}operation/schedule-instance/${scheduleInstance.id}/delete`} color="danger" size="sm">
                      <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ scheduleInstance }: IRootState) => ({
  scheduleInstanceList: scheduleInstance.entities,
  totalItems: scheduleInstance.totalItems
});

const mapDispatchToProps = {
  getOperations
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleInstance);
