import React, { Component, Fragment } from 'react';
import { MdPerson } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { logout } from '../../state/auth/auth.actionCreators';
import './Dropdown.scss';

type Props = {
  dispatch: Function,
};

type State = {
  isSelected: boolean,
};

class Dropdown extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {isSelected: false};
  }

  handleClick = () => {
    this.setState({ isSelected: !this.state.isSelected });
  }

  handleClickOutside = () => {
    this.setState({ isSelected: false });
  };

  handleLogoutClick = (e) => {
    e.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    const { isSelected } = this.state;
    return (
      <div className="Dropdown">
        <div className="Dropdown__inner">
          <button onClick={this.handleClick} className="Dropdown__button">
            <MdPerson className="NavBat__item__icon" />
          </button>
          <div className={isSelected ? "Dropdown__content Dropdown__content--active" : "Dropdown__content"}>
            <a href="#" onClick={this.handleLogoutClick}>Logout</a>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(onClickOutside(Dropdown));