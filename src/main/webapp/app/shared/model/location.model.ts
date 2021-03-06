import { ILocationType } from 'app/shared/model/location-type.model';

export interface ILocation {
  id?: number;
  locationName?: string;
  locationNameSinhala?: string;
  locationNameTamil?: string;
  longitude?: number;
  latitude?: number;
  locationType?: ILocationType;
}

export const defaultValue: Readonly<ILocation> = {};
