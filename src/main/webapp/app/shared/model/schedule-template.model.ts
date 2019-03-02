import { Moment } from 'moment';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { IDriver } from 'app/shared/model/driver.model';
import { IRoute } from 'app/shared/model/route.model';
import { IBay } from 'app/shared/model/bay.model';
import { IWeekday } from 'app/shared/model/weekday.model';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';

export interface IScheduleTemplate {
  id?: number;
  startTime?: Moment;
  endTime?: Moment;
  isActive?: boolean;
  vehicle?: IVehicle;
  driver?: IDriver;
  route?: IRoute;
  bay?: IBay;
  weekdays?: IWeekday[];
  vehicleFacilities?: IVehicleFacility[];
}

export const defaultValue: Readonly<IScheduleTemplate> = {
  isActive: false
};
