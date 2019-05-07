// @flow
import type { User } from './User';

export type Drive = {
  driveId: string,
  id: string,
  name: string,
  url: string,
  owner: User,
};
