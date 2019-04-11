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
      <h1>Settings</h1>
      <GooglePermissions />
      {props.user.hasPassword && <Password />}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Settings);
