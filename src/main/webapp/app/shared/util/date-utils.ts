import moment from 'moment';

import { APP_LOCAL_DATETIME_FORMAT, APP_LOCAL_DATETIME_FORMAT_Z, APP_24HOUR_TIME_FORMAT, APP_LOCAL_TIME_FORMAT, APP_DASH_DATE_FORMAT } from 'app/config/constants';

export const convertDateTimeFromServer = date => (date ? moment(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertToDashedDate = date => (date ? moment(date).format(APP_DASH_DATE_FORMAT) : null);

export const convert24HourTimeFromServer = date => (date ? moment(date).format(APP_24HOUR_TIME_FORMAT) : null);

export const convertLocalTimeFromServer = date => (date ? moment(date).format(APP_LOCAL_TIME_FORMAT) : null);

export const convertDateTimeToServer = date => (date ? moment(date, APP_LOCAL_DATETIME_FORMAT_Z).toDate() : null);
