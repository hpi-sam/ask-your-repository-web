// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './UserAuthNav.scss';

function UserAuthNav(props: Props) {
  return (
    <div className="UserAuthNav">
      <Link
        to="/login"
        className="UserAuthNav__item"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="UserAuthNav__item"
      >
        Register
      </Link>
    </div>
  );
}

export default UserAuthNav;
