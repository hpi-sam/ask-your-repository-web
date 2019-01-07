// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import initials from 'initials';
import classNames from 'classnames';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';
import { closeTeamSidebar } from '../../state/team_sidebar/teamSidebar.actionCreators';
import type { Team } from '../../models/Team';
import type { AppState } from '../../state/AppState';
import './TeamSidebar.scss';

type Props = {
  team: Team,
  dispatch: Function,
  activeTeam: ?Team,
};

class TeamSidebarItem extends Component<Props> {
  handleClick = () => {
    const { dispatch, team } = this.props;
    dispatch(setActiveTeam(team));
    dispatch(closeTeamSidebar());
  };

  render() {
    const { activeTeam, team } = this.props;
    const teamInitials = initials(team.name);

    const className = classNames('TeamSidebar__item', {
      'TeamSidebar__item--active': activeTeam && activeTeam.id === team.id,
    });

    return (
      <button
        type="button"
        onClick={this.handleClick}
        className={className}
        title={team.name}
      >
        <div className="TeamSidebar__item__initials">
          {teamInitials}
        </div>
        <div className="TeamSidebar__item__body">
          {team.name}
        </div>
      </button>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(TeamSidebarItem);
