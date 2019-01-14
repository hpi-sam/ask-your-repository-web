// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import type { Team } from '../../models/Team';
import ActivityIndicator from '../utility/ActivityIndicator';
import TeamService from '../../services/TeamService';
import type { AppState } from '../../state/AppState';
import TeamSelectItem from './TeamSelectItem';
import TeamSelectCreate from './TeamSelectCreate';
import './TeamSelect.scss';

type Props = {
  hasActiveTeam: boolean,
};

type State = {
  teams: Array<Team>,
  isLoading: boolean,
};

class TeamSelect extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      teams: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const teams = await TeamService.list();

    this.setState({
      teams,
      isLoading: false,
    });
  }

  render() {
    const { hasActiveTeam } = this.props;

    if (hasActiveTeam) return <Redirect to="/images" />;

    const { teams, isLoading } = this.state;

    return (
      <div className="TeamSelect">
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Fragment>
            <div className="TeamSelect__title">
              Team wählen
            </div>
            <div className="TeamSelect__list">
              {teams.map(team => (
                <TeamSelectItem
                  key={team.id}
                  team={team}
                />
              ))}
            </div>
            <TeamSelectCreate />
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  hasActiveTeam: !!state.activeTeam,
});

export default connect(mapStateToProps)(TeamSelect);
