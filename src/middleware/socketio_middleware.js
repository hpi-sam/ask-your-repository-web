// @flow
import io from 'socket.io-client';
import { startPresentation } from '../state/presentation/presentation.actionCreators';
import SET_ACTIVE_TEAM from '../state/active_team/activeTeam.actionTypes'
import type { Image } from '../models/Image';
import type { Team } from '../../models/Team';
import humps from 'humps';

let socket = null;

function joinTeam(team: Team ) {
  const data = {
    teamId: team.id,
  }
  socket.emit('join_team', humps.decamelizeKeys(data));
}

function leaveTeam(team: Team ) {
  const data = {
    teamId: team.id,
  }
  socket.emit('leave_team', humps.decamelizeKeys(data));
}

function socketioMiddleware(url) {

	return store => {
		socket = io(url);

		console.log("Configured Socket");

		socket.on('START_PRESENTATION', (images: Image[]) => {
			console.log("Called start presentation");
			if (store.getState().presentationMode.isActive) {
				store.dispatch(startPresentation(images));
			}
		});

		return next => action => {
			if(action.type === SET_ACTIVE_TEAM) {
				const previousTeam = store.getState().activeTeam;
				console.log("Leave Room: " + previousTeam.name)
				if(previousTeam) leaveTeam(previousTeam);
				console.log("Join Room: " + action.team.name)
				joinTeam(action.team);
			}
			return next(action);
		}
	}
}

export default socketioMiddleware;
