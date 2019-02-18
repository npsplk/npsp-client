import { ILocation } from 'app/shared/model/location.model';
import { IParkingSlot } from 'app/shared/model/parking-slot.model';

export interface IParkingArea {
  id?: number;
  areaName?: string;
  location?: ILocation;
  parkingSlots?: IParkingSlot[];
}

export const defaultValue: Readonly<IParkingArea> = {};
