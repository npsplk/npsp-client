import { Moment } from 'moment';

export interface IDriver {
  id?: number;
  driverName?: string;
  contactNumber?: string;
  dateOfBirth?: Moment;
  address?: string;
  licenseNumber?: string;
  licenseExpiryDate?: Moment;
}

export const defaultValue: Readonly<IDriver> = {};
