// @flow
import React, { Component } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { connect } from 'react-redux';
import SingleInputForm from '../utility/form/SingleInputForm';
import TeamService from '../../services/TeamService';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';

type Props = {
  dispatch: Function,
};

type State = {
  isFormActive: boolean,
};

class TeamSelectCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFormActive: false,
    };
  }

  handleFormSubmit = async (name: string) => {
    const team = await TeamService.create({ name });
    this.props.dispatch(setActiveTeam(team));
  };

  handleCloseForm = () => this.setState({ isFormActive: false });

  handleOpenForm = () => this.setState({ isFormActive: true });

  render() {
    const { isFormActive } = this.state;

    return (
      <div className="TeamSelect__create">
        {isFormActive ? (
          <SingleInputForm
            onClose={this.handleCloseForm}
            onSubmit={this.handleFormSubmit}
            placeholder="My Team"
            data-cy="team-select-form"
          />
        ) : (
          <button
            type="button"
            className="TeamSelect__create__button"
            data-cy="team-select-create-button"
            onClick={this.handleOpenForm}
          >
            <IoIosAdd />
          </button>
        )}
      </div>
    );
  }
}

export default connect()(TeamSelectCreate);
