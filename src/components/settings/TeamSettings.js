// @flow
import React, { Component } from 'react';
import TeamService from '../../services/TeamService';
import GoogleDriveSyncSettings from './GoogleDriveSyncSettings';
import TeamInvitationLink from './TeamInvitationLink';
import type { Team } from '../../models/Team';
import './Settings.scss';

type Props = {
  match: {
    params: {
      id: string,
    },
  },
};

type State = {
  team: Team,
}

class Settings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      team: {},
    };
  }

  async componentDidMount() {
    this.reloadTeam();
  }

  reloadTeam = async () => {
    const team = await TeamService.get(this.props.match.params.id);
    this.setState({
      team,
    });
  }

  render() {
    const { team } = this.state;

    return (
      <div className="Settings">
        <h1>
          {' '}
          Settings for Team
          <i>
            {' '}
            {team.name}
            {' '}
          </i>
        </h1>
        <div className="Settings__item">
          <div className="Settings__item__title"> Google Drive Sync </div>
          <GoogleDriveSyncSettings reloadTeam={this.reloadTeam} team={team} />
        </div>
        <div className="Settings__item">
          <div className="Settings__item__title"> Invite people </div>
          <div className="Settings__item__text"> Copy the link below and share it with your team members to allow them access to this team. </div>
          <TeamInvitationLink team={team} />
        </div>
      </div>
    );
  }
}

export default Settings;
