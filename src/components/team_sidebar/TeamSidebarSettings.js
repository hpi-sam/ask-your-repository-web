// @flow
import React, { Component } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import onClickOutside from 'react-onclickoutside';
import TeamInvitationLink from './TeamInvitationLink';
import type { Team } from '../../models/Team';
import './TeamSidebar.scss';

type Props = {
  team: Team,
};

type State = {
  isSelected: boolean,
  showInvitation: boolean,
};

class TeamSidebarSettings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSelected: false,
      showInvitation: false,
    };
  }

  handleDropdownClick = (e) => {
    e.stopPropagation();
    this.setState(state => ({
      isSelected: !state.isSelected,
    }));
  };

  handleClickOutside = () => {
    this.setState({
      isSelected: false,
      showInvitation: false,
    });
  };

  invitePeople = () => {
    this.setState({
      showInvitation: true,
    });
  };

  render() {
    const { isSelected, showInvitation } = this.state;
    const { team } = this.props;
    return (
      <div className="TeamSidebar__dropdown">
        <button
          type="button"
          onClick={this.handleDropdownClick}
          className="TeamSidebar__dropdown__button"
          data-cy="user-dropdown-button"
        >
          <FaEllipsisV />
        </button>
        <div className={isSelected ? 'TeamSidebar__dropdown__content TeamSidebar__dropdown__content--active' : 'TeamSidebar__dropdown__content'}>
          {showInvitation ? (
            <TeamInvitationLink team={team} />
          ) : (
            <button
              type="button"
              onClick={this.invitePeople}
              className="TeamSidebar__dropdown__content__item"
            >
              Invite people
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default onClickOutside(TeamSidebarSettings);
