import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './schedule-template.reducer';
import { IScheduleTemplate } from 'app/shared/model/schedule-template.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_TIME_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IScheduleTemplateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IScheduleTemplateState = IPaginationBaseState;

export class ScheduleTemplate extends React.Component<IScheduleTemplateProps, IScheduleTemplateState> {
  state: IScheduleTemplateState = {
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
    const { scheduleTemplateList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="schedule-template-heading">
          Schedule Templates
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Schedule Template
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
                <th className="hand" onClick={this.sort('isActive')}>
                  Is Active <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Vehicle <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Driver <FontAwesomeIcon icon="sort" />
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
              {scheduleTemplateList.map((scheduleTemplate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${scheduleTemplate.id}`} color="link" size="sm">
                      {scheduleTemplate.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={scheduleTemplate.startTime} format={APP_LOCAL_TIME_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={scheduleTemplate.endTime} format={APP_LOCAL_TIME_FORMAT} />
                  </td>
                  <td>{scheduleTemplate.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    {scheduleTemplate.vehicle ? (
                      <Link to={`../config/vehicle/${scheduleTemplate.vehicle.id}`}>{scheduleTemplate.vehicle.registrationNumber}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {scheduleTemplate.driver ? <Link to={`../config/driver/${scheduleTemplate.driver.id}`}>{scheduleTemplate.driver.driverName}</Link> : ''}
                  </td>
                  <td>
                    {scheduleTemplate.route ? <Link to={`../config/route/${scheduleTemplate.route.id}`}>{scheduleTemplate.route.routeName}</Link> : ''}
                  </td>
                  <td>{scheduleTemplate.bay ? <Link to={`../config/bay/${scheduleTemplate.bay.id}`}>{scheduleTemplate.bay.bayName}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${scheduleTemplate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${scheduleTemplate.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${scheduleTemplate.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ scheduleTemplate }: IRootState) => ({
  scheduleTemplateList: scheduleTemplate.entities,
  totalItems: scheduleTemplate.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleTemplate);
