export const enum Weekdays {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday'
}

export interface IWeekday {
  id?: number;
  weekday?: Weekdays;
}

export const defaultValue: Readonly<IWeekday> = {};
