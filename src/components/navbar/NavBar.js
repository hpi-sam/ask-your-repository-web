// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { MdCloudUpload, MdImage } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Search from './Search';
import Dropdown from './Dropdown';
import TeamInitialsButton from '../team/TeamInitialsButton';
import PresentationSwitch from './PresentationSwitch';
import type { Team } from '../../models/Team';
import type { AppState } from '../../state/AppState';
import { openTeamSidebar } from '../../state/team_sidebar/teamSidebar.actionCreators';
import './NavBar.scss';

type Props = {
  activeTeam: ?Team,
  isTeamSidebarOpen: boolean,
  isAuthenticated: boolean,
  onTeamClick: () => void,
};

function NavBar(props: Props) {
  const {
    isTeamSidebarOpen, onTeamClick, activeTeam, isAuthenticated,
  } = props;

  return (
    <div className={classNames('NavBar', { 'NavBar--with-sidebar': isTeamSidebarOpen })}>
      <div className="NavBar__left">
        {!isTeamSidebarOpen && activeTeam && (
          <TeamInitialsButton
            onClick={onTeamClick}
            className="NavBar__team"
            team={activeTeam}
            data-cy="navbar-team-button"
          />
        )}
        <NavLink
          to="/images"
          className="NavBar__item"
          activeClassName="NavBar__item--active"
        >
          <MdImage className="NavBar__item__icon" />
          <span className="NavBar__item__text">
            Gallery
          </span>
        </NavLink>
        <NavLink
          to="/upload"
          className="NavBar__item"
          activeClassName="NavBar__item--active"
        >
          <MdCloudUpload className="NavBar__item__icon" />
          <span className="NavBar__item__text">
            Upload
          </span>
        </NavLink>
        <PresentationSwitch />
      </div>
      <div className="NavBar__search">
        <Search />
      </div>
      <div className="NavBar__right">
        {isAuthenticated
          ? <Dropdown />
          : (
            <Fragment>
              <NavLink
                to="/login"
                className="NavBar__item"
                activeClassName="NavBar__item--active"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="NavBar__item"
                activeClassName="NavBar__item--active"
              >
                Sign up
              </NavLink>
            </Fragment>
          )
        }
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Function) => ({
  onTeamClick: () => { dispatch(openTeamSidebar()); },
});

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
  isTeamSidebarOpen: state.teamSidebar.isOpen,
  isAuthenticated: state.auth.loggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
