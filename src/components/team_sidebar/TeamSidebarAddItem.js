// @flow
import React, { Component } from 'react';
import { IoIosAdd } from 'react-icons/io';
import TeamSidebarAddItemForm from './TeamSidebarAddItemForm';
import TeamsContext from '../../contexts/TeamsContext';

type Props = {};

type State = {
  isFormActive: boolean,
};

class TeamSidebarAddItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFormActive: false,
    };
  }

  handleCloseForm = () => this.setState({ isFormActive: false });

  handleOpenForm = () => this.setState({ isFormActive: true });

  render() {
    const { isFormActive } = this.state;

    if (isFormActive) {
      return (
        <TeamsContext.Consumer>
          {({ addTeam }) => (
            <TeamSidebarAddItemForm
              onClose={this.handleCloseForm}
              addTeam={addTeam}
            />
          )}
        </TeamsContext.Consumer>
      );
    }

    return (
      <button
        type="button"
        onClick={this.handleOpenForm}
        className="TeamSidebar__item TeamSidebar__item--add"
        data-cy="team-sidebar-add-button"
      >
        <IoIosAdd />
      </button>
    );
  }
}

export default TeamSidebarAddItem;
