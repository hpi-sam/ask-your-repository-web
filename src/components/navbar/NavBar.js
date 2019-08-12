// @flow
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { IoIosArrowDown } from 'react-icons/io';
import { MdImage, MdPerson } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Search from './Search';
import TeamInitialsButton from '../team/TeamInitialsButton';
import PresentationSwitch from './PresentationSwitch';
import type { AppState } from '../../state/AppState';
import { openTeamSidebar } from '../../state/team_sidebar/teamSidebar.actionCreators';
import Dropdown from '../utility/dropdown/Dropdown';
import createGoogleAuthInstance from '../../config/createGoogleAuthInstance';
import { ButtonLink, Button } from '../utility/buttons';
import { logout } from '../../state/auth/auth.actionCreators';
import './NavBar.scss';

const NavBar = () => {
  const dispatch = useDispatch();
  const isTeamSidebarOpen = useSelector((state: AppState) => state.teamSidebar.isOpen);
  const activeTeam = useSelector((state: AppState) => state.activeTeam);
  const user = useSelector((state: AppState) => state.auth.user);

  function handleLogoutClick() {
    createGoogleAuthInstance().then((googleAuth) => {
      googleAuth.signOut();
    });
    dispatch(logout());
  }

  function handleTeamClick() {
    dispatch(openTeamSidebar());
  }

  return (
    <div className={classNames('NavBar', { 'NavBar--with-sidebar': isTeamSidebarOpen })}>
      <div className="NavBar__inner">
        {activeTeam && (
          <Fragment>
            <div className="NavBar__left">
              {!isTeamSidebarOpen && activeTeam && (
                <TeamInitialsButton
                  onClick={handleTeamClick}
                  className="NavBar__team"
                  team={activeTeam}
                  data-cy="navbar-team-button"
                />
              )}
              <div className="NavBar__search">
                <Search />
              </div>
            </div>
          </Fragment>
        )}
        <div className="NavBar__right">
          {activeTeam && (
            <NavLink
              to="/images"
              className="NavBar__item"
              activeClassName="NavBar__item--active"
            >
              <MdImage className="NavBar__item__icon navbar-key" />
              <span className="NavBar__item__text navbar-key">
                Gallery
              </span>
            </NavLink>
          )}
          {user && (
            <div className="NavBar__item">
              <Dropdown
                trigger={(
                  <Fragment>
                    <MdPerson className="NavBar__item__icon hide-sm navbar-key" />
                    <span className="NavBar__item__text navbar-key">
                      {user.username}
                    </span>
                    <IoIosArrowDown className="navbar-key" />
                  </Fragment>
                )}
                content={(
                  <Fragment>
                    <ButtonLink
                      to="/settings"
                      className="Dropdown__content__button"
                    >
                      Settings
                    </ButtonLink>
                    <Button
                      className="Dropdown__content__button"
                      onClick={handleLogoutClick}
                    >
                      Logout
                    </Button>
                  </Fragment>
                )}
              />
            </div>
          )}
          <div className="NavBar__item NavBar__item__presentation-switch">
            <PresentationSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
