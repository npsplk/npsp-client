import './footer.css';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>© Lanka Software Foundation (2019).</p>
      </Col>
    </Row>
  </div>
);

export default Footer;
