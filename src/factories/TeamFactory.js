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

  static createStaticDummyTeam(): Team {
    return {
      id: '2dedf601-f0bf-4290-ac3c-f5761234d068',
      name: 'odio expedita aut',
    };
  }
}

export default TeamFactory;
