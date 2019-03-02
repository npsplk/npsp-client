import { Moment } from 'moment';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { IScheduleTemplate } from 'app/shared/model/schedule-template.model';
import { IDriver } from 'app/shared/model/driver.model';
import { IRoute } from 'app/shared/model/route.model';
import { IBay } from 'app/shared/model/bay.model';

export const enum ScheduleState {
  ARRIVED = 'ARRIVED',
  PENDING = 'PENDING',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED'
}

export interface IScheduleInstance {
  id?: number;
  date?: Moment;
  scheduledTime?: Moment;
  actualScheduledTime?: Moment;
  actualDepartureTime?: Moment;
  specialNotes?: any;
  scheduleState?: ScheduleState;
  vehicle?: IVehicle;
  scheduleTemplate?: IScheduleTemplate;
  driver?: IDriver;
  route?: IRoute;
  bay?: IBay;
}

export const defaultValue: Readonly<IScheduleInstance> = {};
