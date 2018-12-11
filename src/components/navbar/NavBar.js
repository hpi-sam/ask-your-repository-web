// @flow
import React from 'react';
import { MdCloudUpload, MdImage } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
  return (
    <div className="NavBar">
      <NavLink
        to="/images"
        className="NavBar__item"
        activeClassName="NavBar__item--active"
      >
        <MdImage className="NavBar__item__icon" />
        Gallery
      </NavLink>
      <NavLink
        to="/upload"
        className="NavBar__item NavBar__item--upload"
        activeClassName="NavBar__item--active"
      >
        <MdCloudUpload className="NavBar__item__icon" />
        Upload
      </NavLink>
    </div>
  );
}

export default NavBar;
