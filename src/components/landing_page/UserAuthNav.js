// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './UserAuthNav.scss';

function UserAuthNav(props: Props) {
  return (
    <div className="UserAuthNav">
      <Link
        to="/login"
        className="UserAuthNav__item"
        activeClassName="UserAuthNav__item--active">
        Login
      </Link>
      <Link
        to="/register"
        className="UserAuthNav__item"
        activeClassName="UserAuthNav__item--active">
        Register
      </Link>
    </div>
  );
}

export default connect()(UserAuthNav);
