import { ILocationType } from 'app/shared/model/location-type.model';
import { IParkingArea } from 'app/shared/model/parking-area.model';
import { IRoute } from 'app/shared/model/route.model';

export interface ILocation {
  id?: number;
  locationName?: string;
  longitude?: number;
  latitude?: number;
  locationType?: ILocationType;
  parkingAreas?: IParkingArea[];
  routes?: IRoute[];
}

export const defaultValue: Readonly<ILocation> = {};
