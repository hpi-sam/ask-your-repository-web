// @flow
import React from 'react';
import { MdCloudUpload, MdImage } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Search from './Search';
import './NavBar.scss';

function NavBar() {
  return (
    <div className="NavBar">
      <div className="NavBar__left">
        <NavLink
          to="/images"
          className="NavBar__item"
          activeClassName="NavBar__item--active"
        >
          <MdImage className="NavBar__item__icon" />
          Gallery
        </NavLink>
      </div>
      <div className="NavBar__search">
        <Search />
      </div>
      <div className="NavBar__right">
        <NavLink
          to="/upload"
          className="NavBar__item"
          activeClassName="NavBar__item--active"
        >
          <MdCloudUpload className="NavBar__item__icon" />
          Upload
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
