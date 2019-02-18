import { IVehicle } from 'app/shared/model/vehicle.model';

export interface IVehicleOwner {
  id?: number;
  ownerName?: string;
  contactNumber?: string;
  address?: string;
  vehicles?: IVehicle[];
}

export const defaultValue: Readonly<IVehicleOwner> = {};
