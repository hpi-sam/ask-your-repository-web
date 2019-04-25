// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FolderChooser from './FolderChooser';
import './Settings.scss';
import type { AppState } from '../../state/AppState';
import TeamService from '../../services/TeamService';
import type { Team } from '../../models/Team';

type Props = {
  match: {
    params: { id: string }
  }
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
    const team = await TeamService.get(this.props.match.params.id);
    this.setState({
        team,
    });
  }

  hasFolder() {
    return false;
  }

  render() {
    const { team } = this.state;

    return (
      <div className="Settings">
        <h1> Settings for Team<i> {team.name} </i></h1>
        <div id="TeamSettings__googledrive">
          <h2> Connect your team to a Google Drive Folder </h2>          
          {this.hasFolder(team) || <FolderChooser team={team} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});


export default connect(mapStateToProps)(Settings);
