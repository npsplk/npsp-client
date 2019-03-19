import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, ICrudSearchAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IScheduleInstance, defaultValue } from 'app/shared/model/schedule-instance.model';

export const ACTION_TYPES = {
  FETCH_SCHEDULEINSTANCE_LIST: 'scheduleInstance/FETCH_SCHEDULEINSTANCE_LIST',
  FETCH_SCHEDULEINSTANCE: 'scheduleInstance/FETCH_SCHEDULEINSTANCE',
  CREATE_SCHEDULEINSTANCE: 'scheduleInstance/CREATE_SCHEDULEINSTANCE',
  UPDATE_SCHEDULEINSTANCE: 'scheduleInstance/UPDATE_SCHEDULEINSTANCE',
  DELETE_SCHEDULEINSTANCE: 'scheduleInstance/DELETE_SCHEDULEINSTANCE',
  SET_BLOB: 'scheduleInstance/SET_BLOB',
  RESET: 'scheduleInstance/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IScheduleInstance>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ScheduleInstanceState = Readonly<typeof initialState>;

// Reducer

export default (state: ScheduleInstanceState = initialState, action): ScheduleInstanceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SCHEDULEINSTANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SCHEDULEINSTANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SCHEDULEINSTANCE):
    case REQUEST(ACTION_TYPES.UPDATE_SCHEDULEINSTANCE):
    case REQUEST(ACTION_TYPES.DELETE_SCHEDULEINSTANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SCHEDULEINSTANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SCHEDULEINSTANCE):
    case FAILURE(ACTION_TYPES.CREATE_SCHEDULEINSTANCE):
    case FAILURE(ACTION_TYPES.UPDATE_SCHEDULEINSTANCE):
    case FAILURE(ACTION_TYPES.DELETE_SCHEDULEINSTANCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SCHEDULEINSTANCE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SCHEDULEINSTANCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SCHEDULEINSTANCE):
    case SUCCESS(ACTION_TYPES.UPDATE_SCHEDULEINSTANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SCHEDULEINSTANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/schedule-instances';
const apiUrlOperations = 'api/schedule-operations';

// Actions

export const getEntities: ICrudGetAllAction<IScheduleInstance> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SCHEDULEINSTANCE_LIST,
    payload: axios.get<IScheduleInstance>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getOperations: ICrudSearchAction<IScheduleInstance> = (search, page, size, sort) => {
  const requestUrl = `${apiUrlOperations}${sort ? `?page=${page}&size=${size}&sort=${sort}&search=${search}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SCHEDULEINSTANCE_LIST,
    payload: axios.get<IScheduleInstance>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IScheduleInstance> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SCHEDULEINSTANCE,
    payload: axios.get<IScheduleInstance>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IScheduleInstance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SCHEDULEINSTANCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IScheduleInstance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SCHEDULEINSTANCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IScheduleInstance> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SCHEDULEINSTANCE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
