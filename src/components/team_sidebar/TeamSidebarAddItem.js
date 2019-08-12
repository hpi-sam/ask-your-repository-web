// @flow
import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import TeamSidebarAddItemForm from './TeamSidebarAddItemForm';

const TeamSidebarAddItem = () => {
  const [isFormActive, setIsFormActive] = useState(false);

  if (isFormActive) {
    return (
      <TeamSidebarAddItemForm onClose={() => setIsFormActive(false)} />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsFormActive(true)}
      className="TeamSidebar__item TeamSidebar__item--add"
      data-cy="team-sidebar-add-button"
    >
      <IoIosAdd />
    </button>
  );
};

export default TeamSidebarAddItem;
