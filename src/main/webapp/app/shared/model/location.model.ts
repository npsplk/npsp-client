import { ICoordinate } from 'app/shared/model/coordinate.model';

export interface ILocation {
  id?: number;
  locationName?: string;
  coordinate?: ICoordinate;
}

export const defaultValue: Readonly<ILocation> = {};
