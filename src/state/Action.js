// @flow
import type { SetImageAction, AddTagAction, RemoveLastTagAction } from './image/image.actions';

export type Action =
  | SetImageAction
  | AddTagAction
  | RemoveLastTagAction;
