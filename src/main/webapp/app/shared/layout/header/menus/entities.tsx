import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/route">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Route
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/route-location">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Route Location
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/location">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Location
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/location-type">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Location Type
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/transport-type">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Transport Type
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/vehicle-facility">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Vehicle Facility
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/vehicle">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Vehicle
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/driver">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Driver
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/schedule-template">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Schedule Template
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/schedule-instance">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Schedule Instance
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/weekday">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Weekday
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
