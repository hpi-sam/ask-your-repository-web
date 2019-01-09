// @flow
import React from 'react';
import classNames from 'classnames';
import initials from 'initials';
import type { Team } from '../../models/Team';
import './TeamInitials.scss';

type Props = {
  team: Team,
  isActive?: boolean,
};

function TeamInitials(props: Props) {
  const teamInitials = initials(props.team.name);

  const className = classNames('TeamInitials', {
    'TeamInitials--active': props.isActive,
  });

  return (
    <div className={className}>
      {teamInitials}
    </div>
  );
}

TeamInitials.defaultProps = {
  isActive: false,
};

export default TeamInitials;
