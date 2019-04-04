// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { flashErrorMessage } from 'redux-flash';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';
import TeamService from '../../services/TeamService';
import ModalWindow from '../utility/Modal';
import type { Team } from '../../models/Team';
import type { Match } from '../../models/Match';
import type { User } from '../../models/User';
import type { AppState } from '../../state/AppState';
import './TeamJoin.scss';

type Props = {
  match: Match,
  user: User,
  dispatch: Function,
};

type State = {
  team: Team,
  display: boolean,
};

class TeamJoin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      team: {},
      display: false,
    };
  }

  async componentDidMount() {
    const { dispatch, match, user } = this.props;
    const teams = await TeamService.listAll();
    const { joinKey } = match.params;
    const team = teams.find(element => element.joinKey === joinKey);
    const member = user.id;
    try {
      await TeamService.updateMember(team, member);
      this.setState({
        team,
        display: true,
      });
    } catch (error) {
      dispatch(setActiveTeam(team));
      dispatch(push('/images'));
      dispatch(flashErrorMessage(error.response.data.error));
    }
  }

  renderMembersList = () => {
    const { members } = this.state.team;
    const size = 3;
    const tooMany = members.length > size;
    const selection = tooMany ? members.slice(0, size) : members;
    let text = ' ';
    text += selection.map(user => user.username).join(', ');
    if (tooMany) text += '...';

    return text;
  };

  render() {
    const { team, display } = this.state;

    return (
      <div>
        {display && (
          <ModalWindow close={false}>
            <div className="TeamJoin">
              <div className="TeamJoin__title"> You are now member of team</div>
              <div className="TeamJoin__team-name">{team.name}</div>
              <div className="TeamJoin__members">
                <span className="TeamJoin__members__title">
                  Members:
                </span>
                <span>
                  {team.members && this.renderMembersList()}
                </span>
              </div>
              <Link
                className="TeamJoin__button"
                to="/gallery"
              >
                Continue to gallery
              </Link>
            </div>
          </ModalWindow>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(TeamJoin);
