// @flow
/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { MdCheck, MdClose } from 'react-icons/md';
import type { Team } from '../../models/Team';
import SaveButton from '../utility/SaveButton';
import CloseButton from '../utility/CloseButton';
import TeamService from '../../services/TeamService';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';
import { closeTeamSidebar } from '../../state/team_sidebar/teamSidebar.actionCreators';

type Props = {
  onClose: () => void,
  addTeam: (team: Team) => void,
  dispatch: Function,
};

type State = {
  name: string,
};

class TeamSidebarAddItemForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  handleSaveClick = async () => {
    const teamData = this.state;
    const team = await TeamService.create(teamData);

    const { dispatch, onClose, addTeam } = this.props;
    onClose();
    addTeam(team);
    dispatch(setActiveTeam(team));
    dispatch(closeTeamSidebar());
  };

  handleNameChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  handleClickOutside = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div className="TeamSidebar__add-form">
        <div className="TeamSidebar__add-form__inner">
          <input
            autoFocus
            className="TeamSidebar__add-form__input"
            value={this.state.name}
            type="text"
            onChange={this.handleNameChange}
            placeholder="My Team"
          />
          <SaveButton
            onClick={this.handleSaveClick}
            className="TeamSidebar__add-form__button"
          >
            <MdCheck />
          </SaveButton>
          <CloseButton
            onClick={this.props.onClose}
            type="button"
            className="TeamSidebar__add-form__button"
          >
            <MdClose />
          </CloseButton>
        </div>
      </div>
    );
  }
}

export default connect()(onClickOutside(TeamSidebarAddItemForm));
