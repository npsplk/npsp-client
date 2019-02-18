import { ILocation } from 'app/shared/model/location.model';

export interface IRoute {
  id?: number;
  routeName?: string;
  startLocation?: ILocation;
  endLocation?: ILocation;
  locations?: ILocation[];
}

export const defaultValue: Readonly<IRoute> = {};
