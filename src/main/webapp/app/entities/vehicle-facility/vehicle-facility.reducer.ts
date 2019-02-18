import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleFacility, defaultValue } from 'app/shared/model/vehicle-facility.model';

export const ACTION_TYPES = {
  FETCH_VEHICLEFACILITY_LIST: 'vehicleFacility/FETCH_VEHICLEFACILITY_LIST',
  FETCH_VEHICLEFACILITY: 'vehicleFacility/FETCH_VEHICLEFACILITY',
  CREATE_VEHICLEFACILITY: 'vehicleFacility/CREATE_VEHICLEFACILITY',
  UPDATE_VEHICLEFACILITY: 'vehicleFacility/UPDATE_VEHICLEFACILITY',
  DELETE_VEHICLEFACILITY: 'vehicleFacility/DELETE_VEHICLEFACILITY',
  RESET: 'vehicleFacility/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleFacility>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type VehicleFacilityState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleFacilityState = initialState, action): VehicleFacilityState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEFACILITY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEFACILITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLEFACILITY):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLEFACILITY):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLEFACILITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEFACILITY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEFACILITY):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLEFACILITY):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLEFACILITY):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLEFACILITY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEFACILITY_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEFACILITY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLEFACILITY):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLEFACILITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLEFACILITY):
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

const apiUrl = 'api/vehicle-facilities';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleFacility> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEFACILITY_LIST,
    payload: axios.get<IVehicleFacility>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IVehicleFacility> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEFACILITY,
    payload: axios.get<IVehicleFacility>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVehicleFacility> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLEFACILITY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleFacility> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLEFACILITY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleFacility> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLEFACILITY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
