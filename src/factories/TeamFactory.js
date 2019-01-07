// @flow
import faker from 'faker';
import type { Team } from '../models/Team';

class TeamFactory {
  static createDummyTeam(): Team {
    return {
      id: faker.random.uuid(),
      name: faker.lorem.words(),
    };
  }
}

export default TeamFactory;
