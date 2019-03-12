// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Password from './Password';
import './Settings.scss';

type Props = {

};

type State = {
};

class Settings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="Settings">
        <h1> Settings </h1>
        <Password />
      </div>
    );
  }
}

export default connect()(Settings);
