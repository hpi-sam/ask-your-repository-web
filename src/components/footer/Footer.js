import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer className="Footer">
      <ul className="Footer__legal-list">
        <li>
          <a href="/static/imprint.html">Impressum</a>
        </li>
        <li>
          <a href="/static/privacy.html">Datenschutzerklärung</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
