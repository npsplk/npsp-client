import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IWeekday, defaultValue } from 'app/shared/model/weekday.model';

export const ACTION_TYPES = {
  FETCH_WEEKDAY_LIST: 'weekday/FETCH_WEEKDAY_LIST',
  FETCH_WEEKDAY: 'weekday/FETCH_WEEKDAY',
  CREATE_WEEKDAY: 'weekday/CREATE_WEEKDAY',
  UPDATE_WEEKDAY: 'weekday/UPDATE_WEEKDAY',
  DELETE_WEEKDAY: 'weekday/DELETE_WEEKDAY',
  RESET: 'weekday/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWeekday>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type WeekdayState = Readonly<typeof initialState>;

// Reducer

export default (state: WeekdayState = initialState, action): WeekdayState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_WEEKDAY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WEEKDAY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_WEEKDAY):
    case REQUEST(ACTION_TYPES.UPDATE_WEEKDAY):
    case REQUEST(ACTION_TYPES.DELETE_WEEKDAY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_WEEKDAY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WEEKDAY):
    case FAILURE(ACTION_TYPES.CREATE_WEEKDAY):
    case FAILURE(ACTION_TYPES.UPDATE_WEEKDAY):
    case FAILURE(ACTION_TYPES.DELETE_WEEKDAY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEEKDAY_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_WEEKDAY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_WEEKDAY):
    case SUCCESS(ACTION_TYPES.UPDATE_WEEKDAY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_WEEKDAY):
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

const apiUrl = 'api/weekdays';

// Actions

export const getEntities: ICrudGetAllAction<IWeekday> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_WEEKDAY_LIST,
    payload: axios.get<IWeekday>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IWeekday> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WEEKDAY,
    payload: axios.get<IWeekday>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IWeekday> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WEEKDAY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IWeekday> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WEEKDAY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWeekday> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WEEKDAY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
