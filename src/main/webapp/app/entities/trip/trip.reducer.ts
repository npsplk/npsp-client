import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITrip, defaultValue } from 'app/shared/model/trip.model';

export const ACTION_TYPES = {
  FETCH_TRIP_LIST: 'trip/FETCH_TRIP_LIST',
  FETCH_TRIP: 'trip/FETCH_TRIP',
  CREATE_TRIP: 'trip/CREATE_TRIP',
  UPDATE_TRIP: 'trip/UPDATE_TRIP',
  DELETE_TRIP: 'trip/DELETE_TRIP',
  RESET: 'trip/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITrip>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TripState = Readonly<typeof initialState>;

// Reducer

export default (state: TripState = initialState, action): TripState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRIP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRIP):
    case REQUEST(ACTION_TYPES.UPDATE_TRIP):
    case REQUEST(ACTION_TYPES.DELETE_TRIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRIP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRIP):
    case FAILURE(ACTION_TYPES.CREATE_TRIP):
    case FAILURE(ACTION_TYPES.UPDATE_TRIP):
    case FAILURE(ACTION_TYPES.DELETE_TRIP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRIP_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRIP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRIP):
    case SUCCESS(ACTION_TYPES.UPDATE_TRIP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRIP):
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

const apiUrl = 'api/trips';

// Actions

export const getEntities: ICrudGetAllAction<ITrip> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TRIP_LIST,
    payload: axios.get<ITrip>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITrip> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRIP,
    payload: axios.get<ITrip>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITrip> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRIP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITrip> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRIP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITrip> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRIP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
