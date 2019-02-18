import { IVehicleOwner } from 'app/shared/model/vehicle-owner.model';
import { ITransportType } from 'app/shared/model/transport-type.model';
import { IVehicleFacility } from 'app/shared/model/vehicle-facility.model';
import { ITrip } from 'app/shared/model/trip.model';

export interface IVehicle {
  id?: number;
  numberPlate?: string;
  numberOfSeats?: number;
  owner?: IVehicleOwner;
  transportType?: ITransportType;
  vehicleFacilities?: IVehicleFacility[];
  trips?: ITrip[];
}

export const defaultValue: Readonly<IVehicle> = {};
