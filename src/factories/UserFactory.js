// @flow
import faker from 'faker';
import type { User } from '../models/User';

class UserFactory {
  static createDummyUser(): User {
    return {
      id: faker.random.uuid(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      hasPassword: true,
    };
  }

  static createAuthenticatedUser(): User & { token: string } {
    return {
      ...this.createDummyUser(),
      token: faker.random.uuid(),
    };
  }

  static createStaticDummyUser(): User {
    return {
      id: 'f1bc8f40-7698-4df7-b410-efac1f1a03d2',
      email: 'test@example.com',
      username: 'test_user',
      hasPassword: true,
    };
  }

  static createStaticAuthenticatedUser(): User & { token: string } {
    return {
      ...this.createStaticDummyUser(),
      token: '61e6fa4c-de31-48e6-97a2-4f66b31d84e9',
    };
  }
}

export default UserFactory;
