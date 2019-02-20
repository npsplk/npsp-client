import { ILocationType } from 'app/shared/model/location-type.model';
import { IParkingArea } from 'app/shared/model/parking-area.model';

export interface ILocation {
  id?: number;
  locationName?: string;
  longitude?: number;
  latitude?: number;
  locationType?: ILocationType;
  parkingAreas?: IParkingArea[];
}

export const defaultValue: Readonly<ILocation> = {};
