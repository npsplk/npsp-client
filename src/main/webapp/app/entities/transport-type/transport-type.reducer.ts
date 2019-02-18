import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITransportType, defaultValue } from 'app/shared/model/transport-type.model';

export const ACTION_TYPES = {
  FETCH_TRANSPORTTYPE_LIST: 'transportType/FETCH_TRANSPORTTYPE_LIST',
  FETCH_TRANSPORTTYPE: 'transportType/FETCH_TRANSPORTTYPE',
  CREATE_TRANSPORTTYPE: 'transportType/CREATE_TRANSPORTTYPE',
  UPDATE_TRANSPORTTYPE: 'transportType/UPDATE_TRANSPORTTYPE',
  DELETE_TRANSPORTTYPE: 'transportType/DELETE_TRANSPORTTYPE',
  RESET: 'transportType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITransportType>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TransportTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: TransportTypeState = initialState, action): TransportTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRANSPORTTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRANSPORTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRANSPORTTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_TRANSPORTTYPE):
    case REQUEST(ACTION_TYPES.DELETE_TRANSPORTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRANSPORTTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRANSPORTTYPE):
    case FAILURE(ACTION_TYPES.CREATE_TRANSPORTTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_TRANSPORTTYPE):
    case FAILURE(ACTION_TYPES.DELETE_TRANSPORTTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSPORTTYPE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSPORTTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRANSPORTTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_TRANSPORTTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRANSPORTTYPE):
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

const apiUrl = 'api/transport-types';

// Actions

export const getEntities: ICrudGetAllAction<ITransportType> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSPORTTYPE_LIST,
    payload: axios.get<ITransportType>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITransportType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSPORTTYPE,
    payload: axios.get<ITransportType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITransportType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRANSPORTTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITransportType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRANSPORTTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITransportType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRANSPORTTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
