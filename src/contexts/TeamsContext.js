// @flow
import React from 'react';
import type { Team } from '../models/Team';

type TeamsContextValue = {
  teams: Array<Team>,
  addTeam: (team: Team) => void,
};

const TeamsContext = React.createContext<TeamsContextValue>({
  teams: [],
  addTeam: () => {},
});

export default TeamsContext;
