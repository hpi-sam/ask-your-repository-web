// @flow
import io from 'socket.io-client';
import { startPresentation } from '../state/presentation/presentation.actionCreators';
import type { Image } from '../models/Image';

function configureSocket(store: any) {
  if (!process.env.REACT_APP_API_URL) return;

  const socket = io(process.env.REACT_APP_API_URL);

  socket.on('START_PRESENTATION', (images: Image[]) => {
    store.dispatch(startPresentation(images));
  });
}

export default configureSocket;
