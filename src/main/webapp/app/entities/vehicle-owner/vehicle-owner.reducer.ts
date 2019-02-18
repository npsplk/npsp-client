import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleOwner, defaultValue } from 'app/shared/model/vehicle-owner.model';

export const ACTION_TYPES = {
  FETCH_VEHICLEOWNER_LIST: 'vehicleOwner/FETCH_VEHICLEOWNER_LIST',
  FETCH_VEHICLEOWNER: 'vehicleOwner/FETCH_VEHICLEOWNER',
  CREATE_VEHICLEOWNER: 'vehicleOwner/CREATE_VEHICLEOWNER',
  UPDATE_VEHICLEOWNER: 'vehicleOwner/UPDATE_VEHICLEOWNER',
  DELETE_VEHICLEOWNER: 'vehicleOwner/DELETE_VEHICLEOWNER',
  RESET: 'vehicleOwner/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleOwner>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type VehicleOwnerState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleOwnerState = initialState, action): VehicleOwnerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEOWNER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEOWNER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLEOWNER):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLEOWNER):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLEOWNER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEOWNER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEOWNER):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLEOWNER):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLEOWNER):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLEOWNER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEOWNER_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEOWNER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLEOWNER):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLEOWNER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLEOWNER):
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

const apiUrl = 'api/vehicle-owners';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleOwner> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEOWNER_LIST,
    payload: axios.get<IVehicleOwner>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IVehicleOwner> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEOWNER,
    payload: axios.get<IVehicleOwner>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVehicleOwner> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLEOWNER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleOwner> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLEOWNER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleOwner> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLEOWNER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
