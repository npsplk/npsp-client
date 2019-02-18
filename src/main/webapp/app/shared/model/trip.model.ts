import { Moment } from 'moment';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { ISchedule } from 'app/shared/model/schedule.model';
import { IParkingSlot } from 'app/shared/model/parking-slot.model';

export interface ITrip {
  id?: number;
  startDate?: Moment;
  startTime?: Moment;
  endTime?: Moment;
  vehicle?: IVehicle;
  schedule?: ISchedule;
  parkingSlot?: IParkingSlot;
}

export const defaultValue: Readonly<ITrip> = {};
