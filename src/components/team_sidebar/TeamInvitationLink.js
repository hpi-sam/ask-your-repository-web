// @flow
import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import copyToClipboard from '../utility/Clipboard';
import type { Team } from '../../models/Team';
import { Button } from '../utility/buttons';
import './TeamInvitationLink.scss';

type Props = {
  team: Team,
};

function TeamInvitationLink(props: Props) {
  function getLink() {
    return `${window.location.origin || ''}/invites/${props.team.joinKey}`;
  }

  function handleCopyClick() {
    copyToClipboard(getLink());
  }

  return (
    <div className="InviteForm">
      <input
        type="text"
        name="input"
        className="InviteForm__link"
        value={getLink()}
        readOnly
        disabled
        data-cy="team-sidebar-settings-invite-input"
      />
      <Button
        onClick={handleCopyClick}
        className="InviteForm__copy-button"
        data-cy="team-sidebar-settings-invite-copy-button"
      >
        <MdContentCopy className="InviteForm__icon" />
      </Button>
    </div>
  );
}


export default TeamInvitationLink;
