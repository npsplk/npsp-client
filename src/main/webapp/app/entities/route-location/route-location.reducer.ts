import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRouteLocation, defaultValue } from 'app/shared/model/route-location.model';

export const ACTION_TYPES = {
  FETCH_ROUTELOCATION_LIST: 'routeLocation/FETCH_ROUTELOCATION_LIST',
  FETCH_ROUTELOCATION: 'routeLocation/FETCH_ROUTELOCATION',
  CREATE_ROUTELOCATION: 'routeLocation/CREATE_ROUTELOCATION',
  UPDATE_ROUTELOCATION: 'routeLocation/UPDATE_ROUTELOCATION',
  DELETE_ROUTELOCATION: 'routeLocation/DELETE_ROUTELOCATION',
  RESET: 'routeLocation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRouteLocation>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RouteLocationState = Readonly<typeof initialState>;

// Reducer

export default (state: RouteLocationState = initialState, action): RouteLocationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ROUTELOCATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ROUTELOCATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ROUTELOCATION):
    case REQUEST(ACTION_TYPES.UPDATE_ROUTELOCATION):
    case REQUEST(ACTION_TYPES.DELETE_ROUTELOCATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ROUTELOCATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ROUTELOCATION):
    case FAILURE(ACTION_TYPES.CREATE_ROUTELOCATION):
    case FAILURE(ACTION_TYPES.UPDATE_ROUTELOCATION):
    case FAILURE(ACTION_TYPES.DELETE_ROUTELOCATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROUTELOCATION_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROUTELOCATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ROUTELOCATION):
    case SUCCESS(ACTION_TYPES.UPDATE_ROUTELOCATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ROUTELOCATION):
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

const apiUrl = 'api/route-locations';

// Actions

export const getEntities: ICrudGetAllAction<IRouteLocation> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ROUTELOCATION_LIST,
    payload: axios.get<IRouteLocation>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRouteLocation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ROUTELOCATION,
    payload: axios.get<IRouteLocation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRouteLocation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ROUTELOCATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRouteLocation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ROUTELOCATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRouteLocation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ROUTELOCATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
