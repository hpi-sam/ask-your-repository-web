// @flow
import React from 'react';
import initials from 'initials';
import classNames from 'classnames';
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
  const teamInitials = initials(team.name);
  const styleClasses = classNames('TeamInitials', className);

  return (
    <button
      type="button"
      className={styleClasses}
      {...rest}
    >
      <span>{teamInitials}</span>
    </button>
  );
}

TeamInitialsButton.defaultProps = {
  className: '',
};

export default TeamInitialsButton;
