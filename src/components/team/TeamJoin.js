// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { flashErrorMessage } from 'redux-flash';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';
import InviteService from '../../services/InviteService';
import ModalWindow from '../utility/Modal';
import type { Team } from '../../models/Team';
import type { Match } from '../../models/Match';
import './TeamJoin.scss';

type Props = {
  match: Match,
  dispatch: Function,
};

type State = {
  team: Team,
};

class TeamJoin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { team: {} };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { joinKey } = this.props.match.params;
    try {
      const team = await InviteService.join(joinKey || '');
      dispatch(setActiveTeam(team));
      this.setState({ team });
    } catch (error) {
      dispatch(push('/images'));
      dispatch(flashErrorMessage(error.response.data.error));
    }
  }

  renderMembersList = () => {
    const { members } = this.state.team;
    const selected = members.slice(0, 3);
    const list = selected.map(member => member.username).join(',');
    return list + (members.length > 3 ? '...' : '');
  };

  render() {
    const { team } = this.state;

    if (!team) return null;

    return (
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
            data-cy="team-join-continue-gallery"
          >
            Continue to gallery
          </Link>
        </div>
      </ModalWindow>
    );
  }
}

export default connect()(TeamJoin);
