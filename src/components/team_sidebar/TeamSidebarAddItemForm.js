// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import type { Team } from '../../models/Team';
import TeamService from '../../services/TeamService';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';
import { closeTeamSidebar } from '../../state/team_sidebar/teamSidebar.actionCreators';
import SingleInputForm from '../utility/form/SingleInputForm';

type Props = {
  onClose: () => void,
  addTeam: (team: Team) => void,
  dispatch: Function,
};

class TeamSidebarAddItemForm extends Component<Props> {
  handleSaveClick = async (name: string) => {
    const team = await TeamService.create({ name });

    const { dispatch, onClose, addTeam } = this.props;
    onClose();
    addTeam(team);
    dispatch(setActiveTeam(team));
    dispatch(closeTeamSidebar());
  };

  handleClickOutside = () => {
    this.props.onClose();
  };

  render() {
    return (
      <SingleInputForm
        onClose={this.props.onClose}
        onSubmit={this.handleSaveClick}
        placeholder="My Team"
        className="TeamSidebar__create-form"
      />
    );
  }
}

export default connect()(onClickOutside(TeamSidebarAddItemForm));
