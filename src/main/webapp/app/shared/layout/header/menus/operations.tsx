import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const OperationsMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Operations" id="operations-menu">
    <DropdownItem tag={Link} to="/operation/route">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Route
    </DropdownItem>
    <DropdownItem tag={Link} to="/operation/location">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Location
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
