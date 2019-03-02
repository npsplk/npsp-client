import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import route, {
  RouteState
} from 'app/entities/route/route.reducer';
// prettier-ignore
import routeLocation, {
  RouteLocationState
} from 'app/entities/route-location/route-location.reducer';
// prettier-ignore
import location, {
  LocationState
} from 'app/entities/location/location.reducer';
// prettier-ignore
import locationType, {
  LocationTypeState
} from 'app/entities/location-type/location-type.reducer';
// prettier-ignore
import transportType, {
  TransportTypeState
} from 'app/entities/transport-type/transport-type.reducer';
// prettier-ignore
import vehicleFacility, {
  VehicleFacilityState
} from 'app/entities/vehicle-facility/vehicle-facility.reducer';
// prettier-ignore
import vehicle, {
  VehicleState
} from 'app/entities/vehicle/vehicle.reducer';
// prettier-ignore
import driver, {
  DriverState
} from 'app/entities/driver/driver.reducer';
// prettier-ignore
import scheduleTemplate, {
  ScheduleTemplateState
} from 'app/entities/schedule-template/schedule-template.reducer';
// prettier-ignore
import scheduleInstance, {
  ScheduleInstanceState
} from 'app/entities/schedule-instance/schedule-instance.reducer';
// prettier-ignore
import weekday, {
  WeekdayState
} from 'app/entities/weekday/weekday.reducer';
// prettier-ignore
import bay, {
  BayState
} from 'app/entities/bay/bay.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly route: RouteState;
  readonly routeLocation: RouteLocationState;
  readonly location: LocationState;
  readonly locationType: LocationTypeState;
  readonly transportType: TransportTypeState;
  readonly vehicleFacility: VehicleFacilityState;
  readonly vehicle: VehicleState;
  readonly driver: DriverState;
  readonly scheduleTemplate: ScheduleTemplateState;
  readonly scheduleInstance: ScheduleInstanceState;
  readonly weekday: WeekdayState;
  readonly bay: BayState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  route,
  routeLocation,
  location,
  locationType,
  transportType,
  vehicleFacility,
  vehicle,
  driver,
  scheduleTemplate,
  scheduleInstance,
  weekday,
  bay,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
