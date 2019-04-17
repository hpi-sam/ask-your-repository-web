import React from 'react';
import LegalList from './LegalList';
import './Footer.scss';

function UnauthorizedFooter() {
  return (
    <footer className="Footer Footer__unauthorized">
      <LegalList />
    </footer>
  );
}

export default UnauthorizedFooter;
