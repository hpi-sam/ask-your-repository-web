// @flow
import React, { useEffect, useState } from 'react';
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


function hasFolder(team: Team) {
  return false;
}

function Settings(props: Props) {
  console.log('cookies');
  const [team, setTeam]: any = useState(null);

  async function loadTeam() {
    console.log('loading team');
    const fetchedTeam = await TeamService.get(props.match.params.id);
    setTeam(fetchedTeam);
  }

  useEffect(
    () => {
      loadTeam();
    }, [],
  );
  return (
    <div className="Settings">
      <h1> Settings </h1>
      {hasFolder(team) || <FolderChooser team={team} />}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});


export default connect(mapStateToProps)(Settings);
