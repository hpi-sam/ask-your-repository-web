// @flow
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSettings } from 'react-icons/md';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import TeamInitials from '../team/TeamInitials';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';
import { closeTeamSidebar } from '../../state/team_sidebar/teamSidebar.actionCreators';
import type { Team } from '../../models/Team';
import type { AppState } from '../../state/AppState';
import './TeamSidebar.scss';

type Props = {
  team: Team,
};

const TeamSidebarItem = ({ team }: Props) => {
  const dispatch = useDispatch();
  const activeTeam = useSelector((state: AppState) => state.activeTeam);

  const handleClick = () => {
    dispatch(setActiveTeam(team));
    dispatch(closeTeamSidebar());
    dispatch(push('/images'));
  };

  const handleSettingsClick = () => {
    const url = `/teams/${team.id}/settings`;
    dispatch(closeTeamSidebar());
    dispatch(push(url));
  };

  const isActive = !!activeTeam && activeTeam.id === team.id;

  const className = classNames('TeamSidebar__item', {
    'TeamSidebar__item--active': isActive,
  });

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        className="TeamSidebar__item__button"
        title={team.name}
      >
        <TeamInitials
          team={team}
          isActive={isActive}
        />
        <div className="TeamSidebar__item__button__caption">
          {team.name}
        </div>
      </button>
      { isActive && (
        <button
          type="button"
          onClick={handleSettingsClick}
          className="TeamSidebar__dropdown__button"
          data-cy="team-sidebar-settings-dropdown-button"
        >
          <MdSettings />
        </button>
      ) }
    </div>
  );
};

export default TeamSidebarItem;
