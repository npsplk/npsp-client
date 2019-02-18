import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILocationType, defaultValue } from 'app/shared/model/location-type.model';

export const ACTION_TYPES = {
  FETCH_LOCATIONTYPE_LIST: 'locationType/FETCH_LOCATIONTYPE_LIST',
  FETCH_LOCATIONTYPE: 'locationType/FETCH_LOCATIONTYPE',
  CREATE_LOCATIONTYPE: 'locationType/CREATE_LOCATIONTYPE',
  UPDATE_LOCATIONTYPE: 'locationType/UPDATE_LOCATIONTYPE',
  DELETE_LOCATIONTYPE: 'locationType/DELETE_LOCATIONTYPE',
  RESET: 'locationType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILocationType>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LocationTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: LocationTypeState = initialState, action): LocationTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOCATIONTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOCATIONTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LOCATIONTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_LOCATIONTYPE):
    case REQUEST(ACTION_TYPES.DELETE_LOCATIONTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LOCATIONTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOCATIONTYPE):
    case FAILURE(ACTION_TYPES.CREATE_LOCATIONTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_LOCATIONTYPE):
    case FAILURE(ACTION_TYPES.DELETE_LOCATIONTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOCATIONTYPE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOCATIONTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOCATIONTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_LOCATIONTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOCATIONTYPE):
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

const apiUrl = 'api/location-types';

// Actions

export const getEntities: ICrudGetAllAction<ILocationType> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LOCATIONTYPE_LIST,
    payload: axios.get<ILocationType>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ILocationType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOCATIONTYPE,
    payload: axios.get<ILocationType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILocationType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOCATIONTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILocationType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOCATIONTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILocationType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOCATIONTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
