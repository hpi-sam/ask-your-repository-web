// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeamInitials from '../team/TeamInitials';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';
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
      <button
        type="button"
        onClick={this.handleClick}
        className="TeamSelect__item"
      >
        <TeamInitials team={team} />
      </button>
    );
  }
}

export default connect()(TeamSelectItem);
