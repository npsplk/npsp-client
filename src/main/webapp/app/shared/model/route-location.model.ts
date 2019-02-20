import { ILocation } from 'app/shared/model/location.model';
import { IRoute } from 'app/shared/model/route.model';

export interface IRouteLocation {
  id?: number;
  sequenceNumber?: number;
  location?: ILocation;
  route?: IRoute;
}

export const defaultValue: Readonly<IRouteLocation> = {};
