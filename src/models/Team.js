// @flow
import type { User } from './User';

export type Team = {
  id: string,
  joinKey: string,
  name: string,
  members: Array<User>,
  drive: any,
};
