// @flow
import type { User } from './User';

export type Team = {
  id: string,
  name: string,
  members: Array<User>,
};
