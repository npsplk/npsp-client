import { ITransportType } from 'app/shared/model/transport-type.model';
import { IDriver } from 'app/shared/model/driver.model';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';

export interface IVehicle {
  id?: number;
  registrationNumber?: string;
  numberOfSeats?: number;
  transportType?: ITransportType;
  driver?: IDriver;
  vehicleFacilities?: IVehicleFacility[];
}

export const defaultValue: Readonly<IVehicle> = {};
