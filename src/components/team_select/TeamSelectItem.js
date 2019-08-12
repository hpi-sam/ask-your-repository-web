// @flow
import React from 'react';
import { useDispatch } from 'react-redux';
import TeamnInitials from '../team/TeamInitials';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';
import type { Team } from '../../models/Team';
import './TeamSelectItem.scss';

type Props = {
  team: Team,
};

const TeamSelectItem = ({ team }: Props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setActiveTeam(team));
  };

  const renderMembersList = () => {
    const { members } = team;
    const selectionSize = 3;
    const hasMoreThanSelection = members.length > selectionSize;
    const selection = hasMoreThanSelection ? members.slice(0, selectionSize) : members;

    let text = selection.map(user => user.username).join(', ');
    if (hasMoreThanSelection) text += '...';

    return text;
  };

  return (
    <button
      type="button"
      className="TeamSelectItem"
      onClick={handleClick}
    >
      <TeamnInitials team={team} className="TeamSelectItem__avatar" />
      <div className="TeamSelectItem__info">
        <div className="TeamSelectItem__title">
          {team.name}
        </div>
        <div className="TeamSelectItem__members">
          {renderMembersList()}
        </div>
      </div>
    </button>
  );
};

export default TeamSelectItem;
