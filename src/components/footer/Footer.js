// @flow
import React, { Fragment } from 'react';
import LegalList from './LegalList';
import './Footer.scss';

function Footer() {
  return (
    <Fragment>
      <footer className="Footer">
        <LegalList />
      </footer>
    </Fragment>
  );
}

export default Footer;
