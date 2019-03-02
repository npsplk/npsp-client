import { IDriver } from 'app/shared/model/driver.model';
import { ITransportType } from 'app/shared/model/transport-type.model';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';

export interface IVehicle {
  id?: number;
  registrationNumber?: string;
  numberOfSeats?: number;
  driver?: IDriver;
  transportType?: ITransportType;
  vehicleFacilities?: IVehicleFacility[];
}

export const defaultValue: Readonly<IVehicle> = {};
