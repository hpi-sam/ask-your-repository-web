// @flow

import React, { Component } from 'react';
import { MdPerson } from 'react-icons/md';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { logout } from '../../state/auth/auth.actionCreators';
import type { User } from '../../models/User';
import type { AppState } from '../../state/AppState';
import './Dropdown.scss';

type Props = {
  user: User,
  dispatch: Function,
};

type State = {
  isSelected: boolean,
};

class Dropdown extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { isSelected: false };
  }

  handleClick = () => {
    this.setState(state => ({ isSelected: !state.isSelected }));
  }

  handleClickOutside = () => {
    this.setState({ isSelected: false });
  };

  handleLogoutClick = (e) => {
    e.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    const { username } = this.props.user || '';
    const { isSelected } = this.state;
    return (
      <div className="Dropdown">
        <div className="Dropdown__inner">
          <button type="button" onClick={this.handleClick} className="Dropdown__button">
            {username}
            <MdPerson className="Dropdown__button__icon" />
          </button>
          <div className={isSelected ? 'Dropdown__content Dropdown__content--active' : 'Dropdown__content'}>
            <button type="button" onClick={this.handleLogoutClick}>Logout</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});


export default connect(mapStateToProps)(onClickOutside(Dropdown));
