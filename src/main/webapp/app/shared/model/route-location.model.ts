import { IRoute } from 'app/shared/model/route.model';

export interface IRouteLocation {
  id?: number;
  sequenceNumber?: number;
  route?: IRoute;
}

export const defaultValue: Readonly<IRouteLocation> = {};
