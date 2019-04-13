import React, { Fragment } from 'react';
import LegalList from './LegalList';
import './Footer.scss';

function Footer() {
  return (
    <Fragment>
      <footer className="Footer">
        <LegalList />
      </footer>
      <div className="Footer__space" />
    </Fragment>
  );
}

export default Footer;
