// @flow
import React, { useState } from 'react';
import { MdContentCopy } from 'react-icons/md';
import copyToClipboard from '../utility/Clipboard';
import type { Team } from '../../models/Team';
import './TeamInvitationLink.scss';

type Props = {
  team: Team,
};

function TeamInvitationLink(props: Props) {
  const [isCopied, setIsCopied] = useState(false);

  function getLink() {
    return `${window.location.origin || ''}/invites/${props.team.joinKey}`;
  }

  function copyLink() {
    setIsCopied(true);
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
      <MdContentCopy
        className={isCopied ? 'InviteForm__icon InviteForm__icon--active' : 'InviteForm__icon'}
        onClick={copyLink}
        data-cy="team-sidebar-settings-invite-copy-button"
      />
    </div>
  );
}


export default TeamInvitationLink;
