// @flow
import React, { Component } from 'react';
import { MdContentCopy } from 'react-icons/md';
import copyToClipboard from '../utility/Clipboard';
import type { Team } from '../../models/Team';
import './TeamInvitationLink.scss';

type Props = {
  team: Team,
};

type State = {
  isCopied: boolean,
};

class TeamInvitationLink extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isCopied: false,
    };
  }

  getLink() {
    return `${window.location.origin.toString() || ''}/join/${this.props.team.joinKey}`;
  }

  copyLink = () => {
    this.setState({ isCopied: true });
    copyToClipboard(this.getLink());
  };

  render() {
    const { isCopied } = this.state;

    return (
      <div className="InviteForm">
        <input
          type="text"
          name="input"
          className="InviteForm__link"
          value={this.getLink()}
          readOnly
          disabled
          data-cy="team-sidebar-settings-invite-input"
        />
        <MdContentCopy
          className={isCopied ? 'InviteForm__icon InviteForm__icon--active' : 'InviteForm__icon'}
          onClick={this.copyLink}
          data-cy="team-sidebar-settings-invite-copy-button"
        />
      </div>
    );
  }
}

export default TeamInvitationLink;
