import moment from 'moment';

import { APP_LOCAL_DATETIME_FORMAT, APP_LOCAL_DATETIME_FORMAT_Z, APP_TIME_FORMAT } from 'app/config/constants';

export const convertDateTimeFromServer = date => (date ? moment(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertTimeFromServer = date => (date ? moment(date).format(APP_TIME_FORMAT) : null);

export const convertDateTimeToServer = date => (date ? moment(date, APP_LOCAL_DATETIME_FORMAT_Z).toDate() : null);
