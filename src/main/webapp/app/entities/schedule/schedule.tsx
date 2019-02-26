import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './schedule.reducer';
import { ISchedule } from 'app/shared/model/schedule.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, APP_TIME_FORMAT, APP_LOCAL_TIME_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IScheduleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IScheduleState = IPaginationBaseState;

export class Schedule extends React.Component<IScheduleProps, IScheduleState> {
  state: IScheduleState = {
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
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { scheduleList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="schedule-heading">
          Schedules
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Schedule
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('startTime')}>
                  Start Time <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('endTime')}>
                  End Time <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Route <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Start Location <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  End Location <FontAwesomeIcon icon="sort" />
                </th>
                  <th>
                      Weekdays
                  </th>
                  <th>
                      Facilities
                  </th>
              </tr>
            </thead>
            <tbody>
              {scheduleList.map((schedule, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${schedule.id}`} color="link" size="sm">
                      {schedule.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={schedule.startTime} format={APP_LOCAL_TIME_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={schedule.endTime} format={APP_LOCAL_TIME_FORMAT} />
                  </td>
                  <td>{schedule.route ? <Link to={`route/${schedule.route.id}`}>{schedule.route.routeName}</Link> : ''}</td>
                  <td>
                    {schedule.startLocation ? <Link to={`location/${schedule.startLocation.id}`}>{schedule.startLocation.locationName}</Link> : ''}
                  </td>
                  <td>{schedule.endLocation ? <Link to={`location/${schedule.endLocation.id}`}>{schedule.endLocation.locationName}</Link> : ''}</td>
                    <td>
                        {schedule.weekdays
                            ? schedule.weekdays.map((val, x) => (
                                <span key={val.id}>
                      {val.weekday}
                                    {x === schedule.weekdays.length - 1 ? '' : ', '}
                    </span>
                            ))
                            : null}
                    </td>
                    <td>
                        {schedule.vehicleFacilities
                            ? schedule.vehicleFacilities.map((val, x) => (
                                <span key={val.id}>
                      {val.facilityName}
                                    {x === schedule.vehicleFacilities.length - 1 ? '' : ', '}
                    </span>
                            ))
                            : null}
                    </td>
                    <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${schedule.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${schedule.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${schedule.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ schedule }: IRootState) => ({
  scheduleList: schedule.entities,
  totalItems: schedule.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
