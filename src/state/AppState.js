// @flow
import type { ActiveTeamState } from './active_team/activeTeam.reducer';
import type { TeamSidebarState } from './team_sidebar/teamSidebar.reducer';
import type { PresentationState } from './presentation/presentation.reducer';
import type { PresentationModeState } from './presentation_mode/presentationMode.reducer';
import type { AuthState } from './auth/auth.reducer';

export type AppState = {
  activeTeam: ActiveTeamState,
  presentation: PresentationState,
  presentationMode: PresentationModeState,
  teamSidebar: TeamSidebarState,
  auth: AuthState,
};
