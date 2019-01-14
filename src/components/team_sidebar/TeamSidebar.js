// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import { MdPeople, MdClose } from 'react-icons/md';
import type { Team } from '../../models/Team';
import ActivityIndicator from '../utility/ActivityIndicator';
import TeamService from '../../services/TeamService';
import TeamSidebarItem from './TeamSidebarItem';
import TeamSidebarAddItem from './TeamSidebarAddItem';
import TeamsContext from '../../contexts/TeamsContext';
import type { AppState } from '../../state/AppState';
import './TeamSidebar.scss';
import { closeTeamSidebar } from '../../state/team_sidebar/teamSidebar.actionCreators';

type Props = {
  isOpen: boolean,
  dispatch: Function,
};

type State = {
  teams: Array<Team>,
  addTeam: (team: Team) => void,
  isLoading: boolean,
};

class TeamSidebar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.addTeam = (team: Team) => {
      this.setState(state => ({
        teams: [...state.teams, team],
      }));
    };

    this.state = {
      teams: [],
      addTeam: this.addTeam,
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

  handleClose = () => {
    this.props.dispatch(closeTeamSidebar());
  };

  handleClickOutside = () => this.handleClose();

  addTeam: (team: Team) => void;

  render() {
    const { teams, isLoading, addTeam } = this.state;
    const { isOpen } = this.props;

    const className = classNames('TeamSidebar', {
      'TeamSidebar--collapsed': !isOpen,
    });

    return (
      <TeamsContext.Provider value={{ teams, addTeam }}>
        <div className={className}>
          <div className="TeamSidebar__title">
            <MdPeople className="TeamSidebar__title__icon" />
            Teams
            <button
              type="button"
              onClick={this.handleClose}
              className="TeamSidebar__close-button"
            >
              <MdClose />
            </button>
          </div>
          {isLoading ? (
            <div className="TeamSidebar__loading">
              <ActivityIndicator />
            </div>
          ) : (
            <div className="TeamSidebar__list">
              {teams.map(team => (
                <TeamSidebarItem
                  key={team.id}
                  team={team}
                />
              ))}
              <TeamSidebarAddItem />
            </div>
          )}
        </div>
      </TeamsContext.Provider>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isOpen: state.teamSidebar.isOpen,
});

export default connect(mapStateToProps)(onClickOutside(TeamSidebar));
