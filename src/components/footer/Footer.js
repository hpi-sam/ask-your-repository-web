import React from 'react';
import LegalList from './LegalList';
import './Footer.scss';

function Footer() {
  return (
    <div>
      <footer className="Footer">
        <LegalList />
      </footer>
      <div className="Footer__space" />
    </div>
  );
}

export default Footer;
