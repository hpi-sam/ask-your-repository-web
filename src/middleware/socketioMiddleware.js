// @flow
import io from 'socket.io-client';
import humps from 'humps';
import { startPresentation } from '../state/presentation/presentation.actionCreators';
import { SET_ACTIVE_TEAM } from '../state/active_team/activeTeam.actionTypes';
import { SYNCHRONIZED_SEARCH } from '../state/presentation/presentation.actionTypes';
import type { Image } from '../models/Image';
import type { Team } from '../models/Team';
import type { Action } from '../state/Action';

function socketioMiddleware() {
  const socketUrl = process.env.REACT_APP_API_URL;
  let socket;
  if (socketUrl) {
    socket = io(socketUrl);
  } else {
    throw new Error('REACT_APP_API_URL environment variable undefined');
  }

  const joinTeam = (team: Team) => {
    const data = {
      teamId: team.id,
    };
    socket.emit('JOIN_TEAM', humps.decamelizeKeys(data));
  };

  const leaveTeam = (team: Team) => {
    const data = {
      teamId: team.id,
    };
    socket.emit('LEAVE_TEAM', humps.decamelizeKeys(data));
  };

  return (store: any) => {
    socket.on('START_PRESENTATION', (images: Image[]) => {
      if (store.getState().presentationMode.isActive) {
        const filteredImages = images
          .filter(image => image.score > 0)
          .slice(0, 4);

        store.dispatch(startPresentation(filteredImages));
      }
    });

    return (next: any) => (action: Action) => {
      if (action.type === SET_ACTIVE_TEAM) {
        const previousTeam = store.getState().activeTeam;
        if (previousTeam) leaveTeam(previousTeam);
        joinTeam(action.team);
      }

      if (action.type === SYNCHRONIZED_SEARCH) {
        const { id } = store.getState().activeTeam;
        socket.emit('SYNCHRONIZED_SEARCH', { search: action.search, team_id: id });
      }

      if (action.type === 'persist/REHYDRATE') {
        joinTeam(action.payload.activeTeam);
      }

      return next(action);
    };
  };
}

export default socketioMiddleware;
