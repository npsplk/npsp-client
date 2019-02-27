import { IVehicle } from 'app/shared/model/vehicle.model';
import { IScheduleTemplate } from 'app/shared/model/schedule-template.model';

export interface IVehicleFacility {
  id?: number;
  facilityName?: string;
  facilityMeta?: string;
  description?: string;
  vehicles?: IVehicle[];
  scheduleTemplates?: IScheduleTemplate[];
}

export const defaultValue: Readonly<IVehicleFacility> = {};
