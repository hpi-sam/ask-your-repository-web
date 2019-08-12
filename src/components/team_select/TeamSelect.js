// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ActivityIndicator from '../utility/ActivityIndicator';
import type { AppState } from '../../state/AppState';
import TeamSelectItem from './TeamSelectItem';
import TeamSelectCreate from './TeamSelectCreate';
import useTeams from '../team_sidebar/useTeams';
import './TeamSelect.scss';

const TeamSelect = () => {
  const hasActiveTeam = useSelector((state: AppState) => !!state.activeTeam);
  const { teams, isLoading } = useTeams();

  if (hasActiveTeam) return <Redirect to="/images" />;

  return (
    <div className="TeamSelect" data-cy="team-select">
      <div className="TeamSelect__title">
        Select Team
      </div>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <div className="TeamSelect__list">
          {teams.map(team => (
            <TeamSelectItem
              key={team.id}
              team={team}
            />
          ))}
        </div>
      )}
      <TeamSelectCreate />
    </div>
  );
};

export default TeamSelect;
