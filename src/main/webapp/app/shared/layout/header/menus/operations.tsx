import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const OperationsMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Operations" id="operations-menu">
      <DropdownItem tag={Link} to="/operation/schedule-template">
          <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Schedule Template
      </DropdownItem>
      <DropdownItem tag={Link} to="/operation/schedule-instance">
          <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Schedule Instance
      </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
