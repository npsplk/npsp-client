import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicle, defaultValue } from 'app/shared/model/vehicle.model';

export const ACTION_TYPES = {
  FETCH_VEHICLE_LIST: 'vehicle/FETCH_VEHICLE_LIST',
  FETCH_ALL_VEHICLE_LIST: 'vehicle/FETCH_ALL_VEHICLE_LIST',
  FETCH_VEHICLE: 'vehicle/FETCH_VEHICLE',
  CREATE_VEHICLE: 'vehicle/CREATE_VEHICLE',
  UPDATE_VEHICLE: 'vehicle/UPDATE_VEHICLE',
  DELETE_VEHICLE: 'vehicle/DELETE_VEHICLE',
  RESET: 'vehicle/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicle>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type VehicleState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleState = initialState, action): VehicleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ALL_VEHICLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLE):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLE):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ALL_VEHICLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLE):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLE):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLE):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALL_VEHICLE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLE):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLE):
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

const apiUrl = 'api/vehicles';
const apiUrlAll = 'api/all-vehicles';

// Actions

export const getEntities: ICrudGetAllAction<IVehicle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLE_LIST,
    payload: axios.get<IVehicle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getAllEntities: ICrudGetAllAction<IVehicle> = (page, size, sort) => {
  const requestUrl = `${apiUrlAll}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ALL_VEHICLE_LIST,
    payload: axios.get<IVehicle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IVehicle> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLE,
    payload: axios.get<IVehicle>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVehicle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicle> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
