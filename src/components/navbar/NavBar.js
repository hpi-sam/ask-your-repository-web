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
  onTeamClick: () => void,
};

function NavBar(props: Props) {
  const {
    isTeamSidebarOpen, onTeamClick, activeTeam,
  } = props;

  return (
    <div className={classNames('NavBar', { 'NavBar--with-sidebar': isTeamSidebarOpen })}>
      <div className="NavBar__inner">
        {activeTeam && (
          <Fragment>
            <div className="NavBar__left">
              {!isTeamSidebarOpen && activeTeam && (
                <TeamInitialsButton
                  onClick={onTeamClick}
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
          <NavLink
            to="/images"
            className="NavBar__item"
            activeClassName="NavBar__item--active"
          >
            Gallery
          </NavLink>
          <div className="NavBar__item">
            <Dropdown />
          </div>
          <div className="NavBar__item NavBar__presentation-switch">
            <PresentationSwitch />
          </div>
        </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
