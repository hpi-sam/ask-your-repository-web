// @flow
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { MdCloudUpload, MdImage } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Search from './Search';
import type { Team } from '../../models/Team';
import type { AppState } from '../../state/AppState';
import './NavBar.scss';
import { openTeamSidebar } from '../../state/team_sidebar/teamSidebar.actionCreators';
import TeamInitials from '../team/TeamInitials';

type Props = {
  activeTeam: ?Team,
  isTeamSidebarOpen: boolean,
  onTeamClick: () => void,
};

function NavBar(props: Props) {
  const { isTeamSidebarOpen, onTeamClick, activeTeam } = props;

  return (
    <div className={classNames('NavBar', { 'NavBar--with-sidebar': isTeamSidebarOpen })}>
      <div className="NavBar__left">
        {!isTeamSidebarOpen && activeTeam && (
          <button
            type="button"
            onClick={onTeamClick}
            className="NavBar__team"
          >
            <TeamInitials team={activeTeam} />
          </button>
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
      </div>
      <div className="NavBar__search">
        <Search />
      </div>
      <div className="NavBar__right">
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
