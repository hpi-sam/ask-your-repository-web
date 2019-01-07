// @flow
import type { ImageState } from './image/image.reducer';
import type { ActiveTeamState } from './active_team/activeTeam.reducer';
import type { TeamSidebarState } from './team_sidebar/teamSidebar.reducer';
import type { PresentationState } from './presentation/presentation.reducer';

export type AppState = {
  activeTeam: ActiveTeamState,
  image: ImageState,
  presentation: PresentationState,
  teamSidebar: TeamSidebarState,
};
