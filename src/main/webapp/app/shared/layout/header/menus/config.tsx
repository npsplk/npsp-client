import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const ConfigMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Configurations" id="config-menu">
    <DropdownItem tag={Link} to="/config/parking-area">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Parking Area
    </DropdownItem>
    <DropdownItem tag={Link} to="/config/parking-slot">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Parking Slot
    </DropdownItem>
    <DropdownItem tag={Link} to="/config/location-type">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Location Type
    </DropdownItem>
    <DropdownItem tag={Link} to="/config/transport-type">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Transport Type
    </DropdownItem>
    <DropdownItem tag={Link} to="/config/vehicle-facility">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Vehicle Facility
    </DropdownItem>
    <DropdownItem tag={Link} to="/config/vehicle">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Vehicle
    </DropdownItem>
    <DropdownItem tag={Link} to="/config/vehicle-owner">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Vehicle Owner
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
