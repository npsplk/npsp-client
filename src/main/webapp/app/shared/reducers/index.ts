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
import location, {
  LocationState
} from 'app/entities/location/location.reducer';
// prettier-ignore
// prettier-ignore
import parkingArea, {
  ParkingAreaState
} from 'app/entities/parking-area/parking-area.reducer';
// prettier-ignore
import parkingSlot, {
  ParkingSlotState
} from 'app/entities/parking-slot/parking-slot.reducer';
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
import vehicleOwner, {
  VehicleOwnerState
} from 'app/entities/vehicle-owner/vehicle-owner.reducer';
// prettier-ignore
import schedule, {
  ScheduleState
} from 'app/entities/schedule/schedule.reducer';
// prettier-ignore
import trip, {
  TripState
} from 'app/entities/trip/trip.reducer';
// prettier-ignore
import weekday, {
  WeekdayState
} from 'app/entities/weekday/weekday.reducer';
// prettier-ignore
import routeLocation, {
  RouteLocationState
} from 'app/entities/route-location/route-location.reducer';
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
  readonly location: LocationState;
  readonly parkingArea: ParkingAreaState;
  readonly parkingSlot: ParkingSlotState;
  readonly locationType: LocationTypeState;
  readonly transportType: TransportTypeState;
  readonly vehicleFacility: VehicleFacilityState;
  readonly vehicle: VehicleState;
  readonly vehicleOwner: VehicleOwnerState;
  readonly schedule: ScheduleState;
  readonly trip: TripState;
  readonly weekday: WeekdayState;
  readonly routeLocation: RouteLocationState;
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
  location,
  parkingArea,
  parkingSlot,
  locationType,
  transportType,
  vehicleFacility,
  vehicle,
  vehicleOwner,
  schedule,
  trip,
  weekday,
  routeLocation,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
