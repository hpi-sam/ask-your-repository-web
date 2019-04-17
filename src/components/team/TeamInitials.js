// @flow
import React from 'react';
import classNames from 'classnames';
import initials from 'initials';
import type { Team } from '../../models/Team';
import './TeamInitials.scss';

type Props = {
  team: Team,
  isActive?: boolean,
  className: string,
};

function TeamInitials(props: Props) {
  const teamInitials = initials(props.team.name).substring(0, 2);

  const styleClass = classNames('TeamInitials', {
    'TeamInitials--active': props.isActive,
  }, props.className);

  return (
    <div className={styleClass}>
      <span>{teamInitials}</span>
    </div>
  );
}

TeamInitials.defaultProps = {
  isActive: false,
  className: '',
};

export default TeamInitials;
