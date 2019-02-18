import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IParkingSlot, defaultValue } from 'app/shared/model/parking-slot.model';

export const ACTION_TYPES = {
  FETCH_PARKINGSLOT_LIST: 'parkingSlot/FETCH_PARKINGSLOT_LIST',
  FETCH_PARKINGSLOT: 'parkingSlot/FETCH_PARKINGSLOT',
  CREATE_PARKINGSLOT: 'parkingSlot/CREATE_PARKINGSLOT',
  UPDATE_PARKINGSLOT: 'parkingSlot/UPDATE_PARKINGSLOT',
  DELETE_PARKINGSLOT: 'parkingSlot/DELETE_PARKINGSLOT',
  RESET: 'parkingSlot/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IParkingSlot>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ParkingSlotState = Readonly<typeof initialState>;

// Reducer

export default (state: ParkingSlotState = initialState, action): ParkingSlotState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PARKINGSLOT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PARKINGSLOT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PARKINGSLOT):
    case REQUEST(ACTION_TYPES.UPDATE_PARKINGSLOT):
    case REQUEST(ACTION_TYPES.DELETE_PARKINGSLOT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PARKINGSLOT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PARKINGSLOT):
    case FAILURE(ACTION_TYPES.CREATE_PARKINGSLOT):
    case FAILURE(ACTION_TYPES.UPDATE_PARKINGSLOT):
    case FAILURE(ACTION_TYPES.DELETE_PARKINGSLOT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARKINGSLOT_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARKINGSLOT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PARKINGSLOT):
    case SUCCESS(ACTION_TYPES.UPDATE_PARKINGSLOT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PARKINGSLOT):
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

const apiUrl = 'api/parking-slots';

// Actions

export const getEntities: ICrudGetAllAction<IParkingSlot> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PARKINGSLOT_LIST,
    payload: axios.get<IParkingSlot>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IParkingSlot> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PARKINGSLOT,
    payload: axios.get<IParkingSlot>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IParkingSlot> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PARKINGSLOT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IParkingSlot> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PARKINGSLOT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IParkingSlot> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PARKINGSLOT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
