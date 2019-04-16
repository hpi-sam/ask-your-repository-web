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
    this.setState(prevState => ({
      showInvitation: !prevState.showInvitation,
    }));
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
          data-cy="team-sidebar-settings-dropdown-button"
        >
          <FaEllipsisV />
        </button>
        <div className={isSelected ? 'TeamSidebar__dropdown__content TeamSidebar__dropdown__content--active' : 'TeamSidebar__dropdown__content'}>
          <div className="TeamSidebar__dropdown__content__item">
            <button
              type="button"
              onClick={this.invitePeople}
              data-cy="team-sidebar-settings-invite-button"
            >
              Invite people
            </button>
            {showInvitation && (<TeamInvitationLink team={team} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(TeamSidebarSettings);
