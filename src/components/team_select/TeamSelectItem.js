// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';
import TeamInitialsButton from '../team/TeamInitialsButton';
import type { Team } from '../../models/Team';

type Props = {
  team: Team,
  dispatch: Function,
};

class TeamSelectItem extends Component<Props> {
  handleClick = () => {
    const { dispatch, team } = this.props;
    dispatch(setActiveTeam(team));
  };

  render() {
    const { team } = this.props;

    return (
      <TeamInitialsButton
        onClick={this.handleClick}
        team={team}
        className="TeamSelect__item"
        data-cy={`team-select-item-${team.id}`}
      />
    );
  }
}

export default connect()(TeamSelectItem);
