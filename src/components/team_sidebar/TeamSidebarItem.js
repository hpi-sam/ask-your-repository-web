// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import TeamInitials from '../team/TeamInitials';
import TeamSidebarSettings from './TeamSidebarSettings';
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
    dispatch(push('/images'));
  };

  render() {
    const { activeTeam, team } = this.props;
    const isActive = !!activeTeam && activeTeam.id === team.id;

    const className = classNames('TeamSidebar__item', {
      'TeamSidebar__item--active': isActive,
    });

    return (
      <div className={className}>
        <button
          type="button"
          onClick={this.handleClick}
          className="TeamSidebar__item__button"
          title={team.name}
        >
          <TeamInitials
            team={team}
            isActive={isActive}
          />
          <div className="TeamSidebar__item__button__caption">
            {team.name}
          </div>
        </button>
        <TeamSidebarSettings team={team} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(TeamSidebarItem);
