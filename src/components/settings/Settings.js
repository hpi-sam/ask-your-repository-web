// @flow
import React from 'react';
import { connect } from 'react-redux';
import Password from './Password';
import GooglePermissions from './GooglePermissions';
import type { AppState } from '../../state/AppState';
import type { User } from '../../models/User';
import './Settings.scss';

type Props = {
  user: User,
};

function Settings(props: Props) {
  return (
    <div className="Settings">
      <div className="Settings__title"> Settings </div>
      <div className="Settings__item">
        <div className="Settings__item__title">Permissions</div>
        <GooglePermissions />
      </div>
      {props.user.hasPassword && (
        <div className="Settings__item">
          <div className="Settings__item__title">Change Password</div>
          <Password />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Settings);
