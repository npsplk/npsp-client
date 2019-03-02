import { IScheduleTemplate } from 'app/shared/model/schedule-template.model';
import { IVehicle } from 'app/shared/model/vehicle.model';

export interface IVehicleFacility {
  id?: number;
  facilityName?: string;
  facilityMeta?: string;
  description?: string;
  scheduleTemplates?: IScheduleTemplate[];
  vehicles?: IVehicle[];
}

export const defaultValue: Readonly<IVehicleFacility> = {};
