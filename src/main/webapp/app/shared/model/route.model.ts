import { ICoordinate } from 'app/shared/model/coordinate.model';
import { ILocation } from 'app/shared/model/location.model';

export interface IRoute {
  id?: number;
  routeName?: string;
  coordinates?: ICoordinate[];
  startLocation?: ILocation;
  endLocation?: ILocation;
}

export const defaultValue: Readonly<IRoute> = {};
