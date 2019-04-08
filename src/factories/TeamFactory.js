// @flow
import _ from 'lodash';
import faker from 'faker';
import UserFactory from './UserFactory';
import type { Team } from '../models/Team';

class TeamFactory {
  static createDummyTeam(): Team {
    return {
      id: faker.random.uuid(),
      joinKey: faker.random.uuid(),
      name: faker.lorem.words(),
      members: _.times(3, () => UserFactory.createDummyUser()),
    };
  }

  static createStaticDummyTeam(): Team {
    return {
      id: '2dedf601-f0bf-4290-ac3c-f5761234d068',
      joinKey: 'bbaf37e7-6d47-45e3-8538-a20a48920ed7',
      name: 'odio expedita aut',
      members: [UserFactory.createStaticDummyUser()],
    };
  }
}

export default TeamFactory;
