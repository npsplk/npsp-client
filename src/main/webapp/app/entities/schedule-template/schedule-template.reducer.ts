import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IScheduleTemplate, defaultValue } from 'app/shared/model/schedule-template.model';

export const ACTION_TYPES = {
  FETCH_SCHEDULETEMPLATE_LIST: 'scheduleTemplate/FETCH_SCHEDULETEMPLATE_LIST',
  FETCH_SCHEDULETEMPLATE: 'scheduleTemplate/FETCH_SCHEDULETEMPLATE',
  CREATE_SCHEDULETEMPLATE: 'scheduleTemplate/CREATE_SCHEDULETEMPLATE',
  UPDATE_SCHEDULETEMPLATE: 'scheduleTemplate/UPDATE_SCHEDULETEMPLATE',
  DELETE_SCHEDULETEMPLATE: 'scheduleTemplate/DELETE_SCHEDULETEMPLATE',
  RESET: 'scheduleTemplate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IScheduleTemplate>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ScheduleTemplateState = Readonly<typeof initialState>;

// Reducer

export default (state: ScheduleTemplateState = initialState, action): ScheduleTemplateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SCHEDULETEMPLATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SCHEDULETEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SCHEDULETEMPLATE):
    case REQUEST(ACTION_TYPES.UPDATE_SCHEDULETEMPLATE):
    case REQUEST(ACTION_TYPES.DELETE_SCHEDULETEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SCHEDULETEMPLATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SCHEDULETEMPLATE):
    case FAILURE(ACTION_TYPES.CREATE_SCHEDULETEMPLATE):
    case FAILURE(ACTION_TYPES.UPDATE_SCHEDULETEMPLATE):
    case FAILURE(ACTION_TYPES.DELETE_SCHEDULETEMPLATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SCHEDULETEMPLATE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SCHEDULETEMPLATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SCHEDULETEMPLATE):
    case SUCCESS(ACTION_TYPES.UPDATE_SCHEDULETEMPLATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SCHEDULETEMPLATE):
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

const apiUrl = 'api/schedule-templates';

// Actions

export const getEntities: ICrudGetAllAction<IScheduleTemplate> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SCHEDULETEMPLATE_LIST,
    payload: axios.get<IScheduleTemplate>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IScheduleTemplate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SCHEDULETEMPLATE,
    payload: axios.get<IScheduleTemplate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IScheduleTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SCHEDULETEMPLATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IScheduleTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SCHEDULETEMPLATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IScheduleTemplate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SCHEDULETEMPLATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
