// @flow
import type { User } from './User';
import type { Drive } from './Drive';

export type Team = {
  id: string,
  joinKey: string,
  name: string,
  members: Array<User>,
  drive?: Drive,
};
