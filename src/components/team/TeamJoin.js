// @flow
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { flashErrorMessage } from 'redux-flash';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';
import InviteService from '../../services/InviteService';
import Modal from '../utility/Modal';
import type { Team } from '../../models/Team';
import type { Action } from '../../state/Action';
import './TeamJoin.scss';

type Props = {
  match: Match,
  dispatch: Dispatch<Action>,
};

function TeamJoin(props: Props) {
  const { match, dispatch } = props;
  const [team, setTeam] = useState<Team | null>(null);

  async function join() {
    try {
      const fetchedTeam: Team = await InviteService.join(match.params.joinKey || '');
      setTeam(fetchedTeam);
      dispatch(setActiveTeam(fetchedTeam));
    } catch (error) {
      dispatch(push('/images'));
      dispatch(flashErrorMessage(error.response.data.error));
    }
  }

  useEffect(() => {
    join();
  }, []);

  if (!team) return null;

  function renderMembersList() {
    const { members } = team;
    const selected = members.slice(0, 3);
    const list = selected.map(member => member.username).join(',');
    return list + (members.length > 3 ? '...' : '');
  }

  return (
    <Modal close={false}>
      <div className="TeamJoin">
        <div className="TeamJoin__title"> You are now member of team</div>
        <div className="TeamJoin__team-name">{team.name}</div>
        <div className="TeamJoin__members">
          Members:
          {' '}
          {renderMembersList()}
        </div>
        <Link
          className="TeamJoin__button"
          to="/gallery"
          data-cy="team-join-continue-gallery"
        >
          Continue to gallery
        </Link>
      </div>
    </Modal>
  );
}

export default connect()(TeamJoin);
