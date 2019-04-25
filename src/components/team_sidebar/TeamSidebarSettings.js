// @flow
import React, { Component } from 'react';
import { MdSettings } from 'react-icons/md';
import onClickOutside from 'react-onclickoutside';
import TeamInvitationLink from './TeamInvitationLink';
import type { Team } from '../../models/Team';
import './TeamSidebar.scss';

type Props = {
  team: Team,
};

type State = {
  isSelected: boolean,
};

class TeamSidebarSettings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSelected: false,
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
    });
  };

  render() {
    const { isSelected } = this.state;
    const { team } = this.props;
    return (
      <div className="TeamSidebar__dropdown">
        <button
          type="button"
          onClick={this.handleDropdownClick}
          className={isSelected ? 'TeamSidebar__dropdown__button TeamSidebar__dropdown__button--active' : 'TeamSidebar__dropdown__button'}
          data-cy="team-sidebar-settings-dropdown-button"
        >
          <MdSettings />
        </button>
        <div className={isSelected ? 'TeamSidebar__dropdown__content TeamSidebar__dropdown__content--active' : 'TeamSidebar__dropdown__content'}>
          <div className="TeamSidebar__dropdown__content__item">
            <span
              data-cy="team-sidebar-settings-invite-button"
            >
              Invite people
            </span>
            <TeamInvitationLink team={team} />
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(TeamSidebarSettings);
