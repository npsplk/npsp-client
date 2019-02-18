import { IVehicle } from 'app/shared/model/vehicle.model';
import { ISchedule } from 'app/shared/model/schedule.model';

export interface IVehicleFacility {
  id?: number;
  facilityName?: string;
  facilityMeta?: string;
  description?: string;
  vehicles?: IVehicle[];
  schedules?: ISchedule[];
}

export const defaultValue: Readonly<IVehicleFacility> = {};
