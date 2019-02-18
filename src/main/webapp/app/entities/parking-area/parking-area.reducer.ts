import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IParkingArea, defaultValue } from 'app/shared/model/parking-area.model';

export const ACTION_TYPES = {
  FETCH_PARKINGAREA_LIST: 'parkingArea/FETCH_PARKINGAREA_LIST',
  FETCH_PARKINGAREA: 'parkingArea/FETCH_PARKINGAREA',
  CREATE_PARKINGAREA: 'parkingArea/CREATE_PARKINGAREA',
  UPDATE_PARKINGAREA: 'parkingArea/UPDATE_PARKINGAREA',
  DELETE_PARKINGAREA: 'parkingArea/DELETE_PARKINGAREA',
  RESET: 'parkingArea/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IParkingArea>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ParkingAreaState = Readonly<typeof initialState>;

// Reducer

export default (state: ParkingAreaState = initialState, action): ParkingAreaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PARKINGAREA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PARKINGAREA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PARKINGAREA):
    case REQUEST(ACTION_TYPES.UPDATE_PARKINGAREA):
    case REQUEST(ACTION_TYPES.DELETE_PARKINGAREA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PARKINGAREA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PARKINGAREA):
    case FAILURE(ACTION_TYPES.CREATE_PARKINGAREA):
    case FAILURE(ACTION_TYPES.UPDATE_PARKINGAREA):
    case FAILURE(ACTION_TYPES.DELETE_PARKINGAREA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARKINGAREA_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARKINGAREA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PARKINGAREA):
    case SUCCESS(ACTION_TYPES.UPDATE_PARKINGAREA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PARKINGAREA):
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

const apiUrl = 'api/parking-areas';

// Actions

export const getEntities: ICrudGetAllAction<IParkingArea> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PARKINGAREA_LIST,
    payload: axios.get<IParkingArea>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IParkingArea> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PARKINGAREA,
    payload: axios.get<IParkingArea>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IParkingArea> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PARKINGAREA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IParkingArea> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PARKINGAREA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IParkingArea> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PARKINGAREA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
