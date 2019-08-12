// @flow
import React from 'react';
import { useDispatch } from 'react-redux';
import TeamService from '../../services/TeamService';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';
import { closeTeamSidebar } from '../../state/team_sidebar/teamSidebar.actionCreators';
import SingleInputForm from '../utility/form/SingleInputForm';

type Props = {
  onClose: () => void,
};

const TeamSidebarAddItemForm = (props: Props) => {
  const dispatch = useDispatch();
  const { onClose } = props;

  const handleSaveClick = async (name: string) => {
    const { team } = await dispatch(TeamService.create({ name }));
    onClose();
    dispatch(setActiveTeam(team));
    dispatch(closeTeamSidebar());
  };

  return (
    <SingleInputForm
      onClose={() => onClose()}
      onSubmit={handleSaveClick}
      placeholder="My Team"
      className="TeamSidebar__create-form"
      data-cy="team-sidebar-form"
    />
  );
};

export default TeamSidebarAddItemForm;
