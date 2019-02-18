import { IParkingArea } from 'app/shared/model/parking-area.model';

export interface IParkingSlot {
  id?: number;
  slotNumber?: string;
  parkingArea?: IParkingArea;
}

export const defaultValue: Readonly<IParkingSlot> = {};
