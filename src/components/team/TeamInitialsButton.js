// @flow
import React from 'react';
import TeamInitials from './TeamInitials';
import type { Team } from '../../models/Team';
import './TeamInitials.scss';

type Props = {
  team: Team,
  className?: string,
};

function TeamInitialsButton({
  team,
  className,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={className}
      {...rest}
    >
      <TeamInitials team={team} />
    </button>
  );
}

TeamInitialsButton.defaultProps = {
  className: '',
};

export default TeamInitialsButton;
