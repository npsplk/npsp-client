import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBay, defaultValue } from 'app/shared/model/bay.model';

export const ACTION_TYPES = {
  FETCH_BAY_LIST: 'bay/FETCH_BAY_LIST',
  FETCH_ALL_BAY_LIST: 'bay/FETCH_ALL_BAY_LIST',
  FETCH_BAY: 'bay/FETCH_BAY',
  CREATE_BAY: 'bay/CREATE_BAY',
  UPDATE_BAY: 'bay/UPDATE_BAY',
  DELETE_BAY: 'bay/DELETE_BAY',
  RESET: 'bay/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBay>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BayState = Readonly<typeof initialState>;

// Reducer

export default (state: BayState = initialState, action): BayState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BAY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BAY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BAY):
    case REQUEST(ACTION_TYPES.UPDATE_BAY):
    case REQUEST(ACTION_TYPES.DELETE_BAY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BAY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BAY):
    case FAILURE(ACTION_TYPES.CREATE_BAY):
    case FAILURE(ACTION_TYPES.UPDATE_BAY):
    case FAILURE(ACTION_TYPES.DELETE_BAY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BAY_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALL_BAY_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BAY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BAY):
    case SUCCESS(ACTION_TYPES.UPDATE_BAY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BAY):
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

const apiUrl = 'api/bays';
const apiUrlAll = 'api/all-bays';

// Actions

export const getEntities: ICrudGetAllAction<IBay> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BAY_LIST,
    payload: axios.get<IBay>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getAllEntities: ICrudGetAllAction<IBay> = (page, size, sort) => {
  const requestUrl = `${apiUrlAll}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ALL_BAY_LIST,
    payload: axios.get<IBay>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IBay> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BAY,
    payload: axios.get<IBay>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBay> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BAY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBay> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BAY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBay> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BAY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
