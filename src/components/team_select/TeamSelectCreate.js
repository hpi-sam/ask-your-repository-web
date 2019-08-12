// @flow
import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import SingleInputForm from '../utility/form/SingleInputForm';
import TeamService from '../../services/TeamService';
import { setActiveTeam } from '../../state/active_team/activeTeam.actionCreators';

const TeamSelectCreate = () => {
  const dispatch = useDispatch();
  const [isFormActive, setIsFormActive] = useState(false);

  const handleFormSubmit = async (name: string) => {
    const { team } = await dispatch(TeamService.create({ name }));
    dispatch(setActiveTeam(team));
  };

  return (
    <div className="TeamSelect__create">
      {isFormActive ? (
        <SingleInputForm
          onClose={() => setIsFormActive(false)}
          onSubmit={handleFormSubmit}
          placeholder="My Team"
          data-cy="team-select-form"
          className="TeamSelect__create__form"
        />
      ) : (
        <button
          type="button"
          className="TeamSelect__create__button"
          data-cy="team-select-create-button"
          onClick={() => setIsFormActive(true)}
        >
          <IoIosAdd />
        </button>
      )}
    </div>
  );
};

export default TeamSelectCreate;
