import { Moment } from 'moment';
import { IRoute } from 'app/shared/model/route.model';
import { IWeekday } from 'app/shared/model/weekday.model';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';

export interface IScheduleTemplate {
  id?: number;
  startTime?: Moment;
  endTime?: Moment;
  route?: IRoute;
  weekdays?: IWeekday[];
  vehicleFacilities?: IVehicleFacility[];
}

export const defaultValue: Readonly<IScheduleTemplate> = {};
