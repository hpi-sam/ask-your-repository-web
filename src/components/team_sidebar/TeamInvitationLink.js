// @flow
import React, { Component } from 'react';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa';
import { MdContentCopy, MdContentPaste } from 'react-icons/md';
import { copyToClipboard } from '../utility/Clipboard';
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

  copyLink = () => {
    this.setState({
      isCopied: true,
    });
    copyToClipboard(this.props.team.joinKey);
  };

  render() {
    const { isCopied } = this.state;
    const { team } = this.props;

    return (
      <div className="InviteForm">
        <input
          type="text"
          name="input"
          className="InviteForm__link"
          value={team.joinKey}
          readOnly
          disabled
        />
        <MdContentCopy
          className={isCopied ? 'InviteForm__icon InviteForm__icon--active' : 'InviteForm__icon'}
          onClick={this.copyLink}
        />
      </div>
    );
  }
}

export default TeamInvitationLink;
