// @flow
import type { SetImageAction, AddTagAction, RemoveLastTagAction } from './image/image.actions';
import type { StartPresentationAction } from './presentation/presentation.actions';

export type Action =
  | SetImageAction
  | AddTagAction
  | RemoveLastTagAction
  | StartPresentationAction;
