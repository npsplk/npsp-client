import { Moment } from 'moment';
import { IRoute } from 'app/shared/model/route.model';
import { ILocation } from 'app/shared/model/location.model';
import { IWeekday } from 'app/shared/model/weekday.model';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';
import { ITrip } from 'app/shared/model/trip.model';

export interface ISchedule {
  id?: number;
  startTime?: Moment;
  endTime?: Moment;
  route?: IRoute;
  startLocation?: ILocation;
  endLocation?: ILocation;
  weekdays?: IWeekday[];
  vehicleFacilities?: IVehicleFacility[];
  trips?: ITrip[];
}

export const defaultValue: Readonly<ISchedule> = {};
