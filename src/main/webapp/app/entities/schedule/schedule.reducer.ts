import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISchedule, defaultValue } from 'app/shared/model/schedule.model';

export const ACTION_TYPES = {
  FETCH_SCHEDULE_LIST: 'schedule/FETCH_SCHEDULE_LIST',
  FETCH_SCHEDULE: 'schedule/FETCH_SCHEDULE',
  CREATE_SCHEDULE: 'schedule/CREATE_SCHEDULE',
  UPDATE_SCHEDULE: 'schedule/UPDATE_SCHEDULE',
  DELETE_SCHEDULE: 'schedule/DELETE_SCHEDULE',
  RESET: 'schedule/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISchedule>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ScheduleState = Readonly<typeof initialState>;

// Reducer

export default (state: ScheduleState = initialState, action): ScheduleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SCHEDULE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SCHEDULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SCHEDULE):
    case REQUEST(ACTION_TYPES.UPDATE_SCHEDULE):
    case REQUEST(ACTION_TYPES.DELETE_SCHEDULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SCHEDULE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SCHEDULE):
    case FAILURE(ACTION_TYPES.CREATE_SCHEDULE):
    case FAILURE(ACTION_TYPES.UPDATE_SCHEDULE):
    case FAILURE(ACTION_TYPES.DELETE_SCHEDULE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SCHEDULE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SCHEDULE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SCHEDULE):
    case SUCCESS(ACTION_TYPES.UPDATE_SCHEDULE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SCHEDULE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/schedules';

// Actions

export const getEntities: ICrudGetAllAction<ISchedule> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SCHEDULE_LIST,
    payload: axios.get<ISchedule>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISchedule> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SCHEDULE,
    payload: axios.get<ISchedule>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISchedule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SCHEDULE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISchedule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SCHEDULE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISchedule> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SCHEDULE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
