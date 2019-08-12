// @flow
import React, { useState, useRef } from 'react';
import { MdSettings } from 'react-icons/md';
import useOnClickOutside from 'use-onclickoutside';
import TeamInvitationLink from '../settings/TeamInvitationLink';
import type { Team } from '../../models/Team';
import './TeamSidebar.scss';

type Props = {
  team: Team,
};

const TeamSidebarSettings = ({ team }: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsSelected(false));

  const handleDropdownClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsSelected(!isSelected);
  };

  return (
    <div className="TeamSidebar__dropdown" ref={ref}>
      <button
        type="button"
        onClick={handleDropdownClick}
        className={isSelected ? 'TeamSidebar__dropdown__button TeamSidebar__dropdown__button--active' : 'TeamSidebar__dropdown__button'}
        data-cy="team-sidebar-settings-dropdown-button"
      >
        <MdSettings />
      </button>
      <div className={isSelected ? 'TeamSidebar__dropdown__content TeamSidebar__dropdown__content--active' : 'TeamSidebar__dropdown__content'}>
        <div className="TeamSidebar__dropdown__content__item">
          <span
            data-cy="team-sidebar-settings-invite-button"
          >
            Invite people
          </span>
          <TeamInvitationLink team={team} />
        </div>
      </div>
    </div>
  );
};

export default TeamSidebarSettings;
