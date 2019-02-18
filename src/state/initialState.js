// @flow

// This file is only for state related testing

import type { AppState } from './AppState';
import { initialState as presentation } from './presentation/presentation.reducer';
import { initialState as teamSidebar } from './team_sidebar/teamSidebar.reducer';
import { initialState as presentationMode } from './presentation_mode/presentationMode.reducer';
import { initialState as activeTeam } from './active_team/activeTeam.reducer';
import { initialState as auth } from './auth/auth.reducer';

const initialState: AppState = {
  flash: { messages: [] },
  presentation,
  activeTeam,
  teamSidebar,
  presentationMode,
  auth,
};

export default initialState;
