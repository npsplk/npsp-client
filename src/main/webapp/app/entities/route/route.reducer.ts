import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRoute, defaultValue } from 'app/shared/model/route.model';
import { ILocation } from 'app/shared/model/location.model';
import { IRouteLocation } from 'app/shared/model/route-location.model';

export const ACTION_TYPES = {
  FETCH_ROUTE_LIST: 'route/FETCH_ROUTE_LIST',
  FETCH_ROUTE: 'route/FETCH_ROUTE',
  CREATE_ROUTE: 'route/CREATE_ROUTE',
  UPDATE_ROUTE: 'route/UPDATE_ROUTE',
  DELETE_ROUTE: 'route/DELETE_ROUTE',
  SELECT_LOCATION: 'route/SELECT_LOCATION',
  RESET: 'route/RESET',
  ADD_ROUTELOCATION: 'route/ADD_ROUTELOCATION',
  REMOVE_ROUTELOCATIONS: 'route/REMOVE_ROUTELOCATIONS',
  SELECT_ROUTELOCATIONS: 'route/SELECT_ROUTELOCATIONS'
};

export interface ISelectedRouteLocationOption {
  value?: string;
  label?: string;
  routeLocation?: Readonly<IRouteLocation>;
}

export interface ISelectedLocationOption {
  value?: string;
  label?: string;
  location: Readonly<ILocation>;
}
export const defaultLocation: Readonly<ILocation> = {};
export const defaultLocationSelectOption: Readonly<ISelectedLocationOption> = { location: defaultLocation };

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRoute>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  selectedLocationOption: defaultLocationSelectOption,
  selectedRouteLocationOptions: [] as ReadonlyArray<ISelectedRouteLocationOption>
};

export type RouteState = Readonly<typeof initialState>;

// Reducer

export default (state: RouteState = initialState, action): RouteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ROUTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ROUTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ROUTE):
    case REQUEST(ACTION_TYPES.UPDATE_ROUTE):
    case REQUEST(ACTION_TYPES.DELETE_ROUTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ROUTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ROUTE):
    case FAILURE(ACTION_TYPES.CREATE_ROUTE):
    case FAILURE(ACTION_TYPES.UPDATE_ROUTE):
    case FAILURE(ACTION_TYPES.DELETE_ROUTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROUTE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROUTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ROUTE):
    case SUCCESS(ACTION_TYPES.UPDATE_ROUTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ROUTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case (ACTION_TYPES.SELECT_LOCATION):
      const newLocation = action.payload;
        return {
          ...state,
          selectedLocationOption: newLocation
      };
    case (ACTION_TYPES.ADD_ROUTELOCATION):
      const routeEntity = state.entity;
        routeEntity.routeLocations.push(action.payload);
      return {
          ...state,
          entity: routeEntity
      };
    case (ACTION_TYPES.SELECT_ROUTELOCATIONS):
      const selectedEntities = action.payload;
      return {
          ...state,
          selectedRouteLocationOptions: selectedEntities
      };
    case (ACTION_TYPES.REMOVE_ROUTELOCATIONS):
      const existingEntity = state.entity;
      let existingList = state.entity.routeLocations.slice();
      action.payload.map(listIndex => (
          existingList = existingList.filter((val, index) => index !== listIndex)
      ));
      return {
          ...state,
          entity: {
            routeLocations: existingList,
            id: existingEntity.id,
            routeName: existingEntity.routeName,
            routeNumber: existingEntity.routeNumber
          },
          selectedRouteLocationOptions: []
    };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/routes';

// Actions

export const getEntities: ICrudGetAllAction<IRoute> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ROUTE_LIST,
    payload: axios.get<IRoute>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRoute> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ROUTE,
    payload: axios.get<IRoute>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRoute> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ROUTE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRoute> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ROUTE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRoute> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ROUTE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const selectLocation = locationOption => ({
  type: ACTION_TYPES.SELECT_LOCATION,
  payload: locationOption
});

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
