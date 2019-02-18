import { ISchedule } from 'app/shared/model/schedule.model';

export interface IWeekday {
  id?: number;
  weekdayName?: string;
  weekdayMeta?: string;
  schedules?: ISchedule[];
}

export const defaultValue: Readonly<IWeekday> = {};
