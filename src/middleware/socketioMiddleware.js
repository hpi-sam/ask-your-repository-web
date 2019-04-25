// @flow
import io from 'socket.io-client';
import humps from 'humps';
import { startPresentation } from '../state/presentation/presentation.actionCreators';
import { SET_ACTIVE_TEAM } from '../state/active_team/activeTeam.actionTypes';
import { SYNCHRONIZED_SEARCH } from '../state/presentation/presentation.actionTypes';
import { filterImages } from '../services/ImageService';
import type { Team } from '../models/Team';
import type { Action } from '../state/Action';
import type { SocketioImages } from '../models/Image';

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
    socket.emit('ENTER_TEAM_SPACE', humps.decamelizeKeys(data));
  };

  const leaveTeam = (team: Team) => {
    const data = {
      teamId: team.id,
    };
    socket.emit('EXIT_TEAM_SPACE', humps.decamelizeKeys(data));
  };

  return (store: any) => {
    socket.on('START_PRESENTATION', (responseData: SocketioImages) => {
      if (store.getState().presentationMode.isActive) {
        const { images }: any = humps.camelizeKeys(responseData);
        store.dispatch(startPresentation(filterImages(images, 5), responseData.search));
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
        if (action.payload && action.payload.activeTeam) {
          joinTeam(action.payload.activeTeam);
        }
      }

      return next(action);
    };
  };
}

export default socketioMiddleware;
