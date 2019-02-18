import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITripProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ITripState = IPaginationBaseState;

export class Trip extends React.Component<ITripProps, ITripState> {
  state: ITripState = {
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
    const { tripList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="trip-heading">
          Trips
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Trip
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('startDate')}>
                  Start Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('startTime')}>
                  Start Time <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('endTime')}>
                  End Time <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('specialNotes')}>
                  Special Notes <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Vehicle <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Schedule <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Parking Slot <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tripList.map((trip, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${trip.id}`} color="link" size="sm">
                      {trip.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={trip.startDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={trip.startTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={trip.endTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{trip.specialNotes}</td>
                  <td>{trip.vehicle ? <Link to={`vehicle/${trip.vehicle.id}`}>{trip.vehicle.id}</Link> : ''}</td>
                  <td>{trip.schedule ? <Link to={`schedule/${trip.schedule.id}`}>{trip.schedule.id}</Link> : ''}</td>
                  <td>{trip.parkingSlot ? <Link to={`parking-slot/${trip.parkingSlot.id}`}>{trip.parkingSlot.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${trip.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trip.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trip.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ trip }: IRootState) => ({
  tripList: trip.entities,
  totalItems: trip.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trip);
