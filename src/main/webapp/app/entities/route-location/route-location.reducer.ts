import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, IPayload } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRouteLocation, defaultValue } from 'app/shared/model/route-location.model';

type ICrudGetAllByParentAction<T> = (route?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const ACTION_TYPES = {
  FETCH_ROUTELOCATION_LIST: 'routeLocation/FETCH_ROUTELOCATION_LIST',
  FETCH_ROUTELOCATION: 'routeLocation/FETCH_ROUTELOCATION',
  CREATE_ROUTELOCATION: 'routeLocation/CREATE_ROUTELOCATION',
  UPDATE_ROUTELOCATION: 'routeLocation/UPDATE_ROUTELOCATION',
  DELETE_ROUTELOCATION: 'routeLocation/DELETE_ROUTELOCATION',
  RESET: 'routeLocation/RESET',
  ADD_ROUTELOCATION: 'routeLocation/ADD_ROUTELOCATION',
  REMOVE_ROUTELOCATIONS: 'routeLocation/REMOVE_ROUTELOCATIONS',
  SELECT_ROUTELOCATIONS: 'routeLocation/SELECT_ROUTELOCATIONS'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRouteLocation>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  selectedRouteLocations: []
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
    case (ACTION_TYPES.ADD_ROUTELOCATION):
      const newEntities = state.entities.slice();
      newEntities.push(action.payload);
      return {
        ...state,
        entities: newEntities
      };
    case (ACTION_TYPES.SELECT_ROUTELOCATIONS):
      const selectedEntities = state.entities.slice();
        selectedEntities.push(action.payload);
      return {
          ...state,
          entities: newEntities
    };
    case (ACTION_TYPES.REMOVE_ROUTELOCATIONS):
      const existingList = state.entities.slice();
      const thiswa = action.payload;
      // action.payload.map(routeLocation => (
        delete existingList[1];
      // ));
      return {
          ...state,
          entities: existingList
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

export const getEntities: ICrudGetAllByParentAction<IRouteLocation> = route => {
  const requestUrl = `${apiUrl}${route ? `?route=${route}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ROUTELOCATION_LIST,
    payload: axios.get<IRouteLocation>(`${requestUrl}&cacheBuster=${new Date().getTime()}`)
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

export const addRouteLocation = route => ({
  type: ACTION_TYPES.ADD_ROUTELOCATION,
  payload: route
});

export const removeRouteLocations = routeLocations => ({
  type: ACTION_TYPES.REMOVE_ROUTELOCATIONS,
  payload: routeLocations
});

export const selectRouteLocations = routeLocations => ({
  type: ACTION_TYPES.SELECT_ROUTELOCATIONS,
  payload: routeLocations
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
