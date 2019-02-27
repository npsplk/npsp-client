import { Moment } from 'moment';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { IScheduleTemplate } from 'app/shared/model/schedule-template.model';
import { IDriver } from 'app/shared/model/driver.model';

export interface IScheduleInstance {
  id?: number;
  date?: Moment;
  scheduledTime?: Moment;
  actualScheduledTime?: Moment;
  actualDepartureTime?: Moment;
  specialNotes?: any;
  vehicle?: IVehicle;
  scheduleTemplate?: IScheduleTemplate;
  driver?: IDriver;
}

export const defaultValue: Readonly<IScheduleInstance> = {};
