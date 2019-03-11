import { IRouteLocation } from 'app/shared/model/route-location.model';

export interface IRoute {
  id?: number;
  routeName?: string;
  routeNumber?: string;
  routeLocations?: IRouteLocation[];
}

export const defaultValue: Readonly<IRoute> = {
  id: null,
  routeName: '',
  routeNumber: '',
  routeLocations: []
};
