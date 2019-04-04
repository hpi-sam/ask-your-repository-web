// @flow
import React, { Component } from 'react';
import { MdContentCopy } from 'react-icons/md';
import { copyToClipboard } from '../utility/Clipboard';
import type { Team } from '../../models/Team';
import './TeamInvitationLink.scss';

type Props = {
  team: Team,
};

type State = {
  isCopied: boolean,
  link: string,
};

class TeamInvitationLink extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const baseUrl = 'localhost:3000/join/';
    const link = baseUrl + this.props.team.joinKey;

    this.state = {
      isCopied: false,
      link,
    };
  }

  copyLink = () => {
    this.setState({
      isCopied: true,
    });
    copyToClipboard(this.state.link);
  };

  render() {
    const { isCopied, link } = this.state;

    return (
      <div className="InviteForm">
        <input
          type="text"
          name="input"
          className="InviteForm__link"
          value={link}
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
