import React from 'react';
import LegalList from '../footer/LegalList';
import './LandingPageFooter.scss';

function LandingPageFooter() {
  return (
    <div>
      <footer className="LandingPageFooter">
        <LegalList />
      </footer>
    </div>
  );
}

export default LandingPageFooter;
