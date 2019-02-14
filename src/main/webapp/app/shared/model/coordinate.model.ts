import { IRoute } from 'app/shared/model/route.model';

export interface ICoordinate {
  id?: number;
  longitude?: number;
  latitude?: number;
  route?: IRoute;
}

export const defaultValue: Readonly<ICoordinate> = {};
