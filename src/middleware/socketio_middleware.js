// @flow
import io from 'socket.io-client';
import { startPresentation } from '../state/presentation/presentation.actionCreators';
import SET_ACTIVE_TEAM from '../state/active_team/activeTeam.actionTypes'
import type { Image } from '../models/Image';
import type { Team } from '../models/Team';
import type { Action } from '../state/Action'
import humps from 'humps';

function socketioMiddleware(url : string) {

	return (store : any) => {
		const socket = io(url);

		const joinTeam = (team: Team ) => {
			const data = {
				teamId: team.id,
			}
			socket.emit('join_team', humps.decamelizeKeys(data));
		}

		const leaveTeam = (team: Team ) => {
			const data = {
				teamId: team.id,
			}
			socket.emit('leave_team', humps.decamelizeKeys(data));
		}

		socket.on('START_PRESENTATION', (images: Image[]) => {
			console.log("Called start presentation");
			if (store.getState().presentationMode.isActive) {
				store.dispatch(startPresentation(images));
			}
		});

		return (next : any) => (action : Action) => {
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
