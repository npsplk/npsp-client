import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDriver, defaultValue } from 'app/shared/model/driver.model';

export const ACTION_TYPES = {
  FETCH_DRIVER_LIST: 'driver/FETCH_DRIVER_LIST',
  FETCH_DRIVER: 'driver/FETCH_DRIVER',
  CREATE_DRIVER: 'driver/CREATE_DRIVER',
  UPDATE_DRIVER: 'driver/UPDATE_DRIVER',
  DELETE_DRIVER: 'driver/DELETE_DRIVER',
  RESET: 'driver/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDriver>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DriverState = Readonly<typeof initialState>;

// Reducer

export default (state: DriverState = initialState, action): DriverState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DRIVER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DRIVER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DRIVER):
    case REQUEST(ACTION_TYPES.UPDATE_DRIVER):
    case REQUEST(ACTION_TYPES.DELETE_DRIVER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DRIVER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DRIVER):
    case FAILURE(ACTION_TYPES.CREATE_DRIVER):
    case FAILURE(ACTION_TYPES.UPDATE_DRIVER):
    case FAILURE(ACTION_TYPES.DELETE_DRIVER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVER_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DRIVER):
    case SUCCESS(ACTION_TYPES.UPDATE_DRIVER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DRIVER):
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

const apiUrl = 'api/drivers';

// Actions

export const getEntities: ICrudGetAllAction<IDriver> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DRIVER_LIST,
    payload: axios.get<IDriver>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDriver> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DRIVER,
    payload: axios.get<IDriver>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDriver> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DRIVER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDriver> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DRIVER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDriver> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DRIVER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
