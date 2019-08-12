// @flow
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from 'use-onclickoutside';
import classNames from 'classnames';
import { MdPeople, MdClose } from 'react-icons/md';
import ActivityIndicator from '../utility/ActivityIndicator';
import TeamSidebarItem from './TeamSidebarItem';
import TeamSidebarAddItem from './TeamSidebarAddItem';
import type { AppState } from '../../state/AppState';
import { closeTeamSidebar } from '../../state/team_sidebar/teamSidebar.actionCreators';
import useTeams from './useTeams';
import './TeamSidebar.scss';

const TeamSidebar = () => {
  const dispatch = useDispatch();
  const { teams, isLoading } = useTeams();
  const isOpen = useSelector((state: AppState) => state.teamSidebar.isOpen);
  const ref = useRef(null);

  const handleClose = () => {
    if (!isOpen) return;
    dispatch(closeTeamSidebar());
  };

  useOnClickOutside(ref, () => handleClose());

  const className = classNames('TeamSidebar', {
    'TeamSidebar--collapsed': !isOpen,
  });

  return (
    <div className={className} data-cy="team-sidebar" ref={ref}>
      <div className="TeamSidebar__title">
        <MdPeople className="TeamSidebar__title__icon" />
        Teams
        <button
          type="button"
          onClick={handleClose}
          className="TeamSidebar__close-button"
        >
          <MdClose />
        </button>
      </div>
      {isLoading ? (
        <div className="TeamSidebar__loading">
          <ActivityIndicator />
        </div>
      ) : (
        <div className="TeamSidebar__list">
          {teams.map(team => (
            <TeamSidebarItem
              key={team.id}
              team={team}
            />
          ))}
          <TeamSidebarAddItem />
        </div>
      )}
    </div>
  );
};

export default TeamSidebar;
