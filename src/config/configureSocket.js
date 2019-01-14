// @flow
import io from 'socket.io-client';
import { startPresentation } from '../state/presentation/presentation.actionCreators';
import type { Image } from '../models/Image';

function configureSocket(store: any) {
  if (!process.env.REACT_APP_API_URL) return;

  // store.subscribe((action) => {
  // });

  const socket = io(process.env.REACT_APP_API_URL);

  socket.on('START_PRESENTATION', (images: Image[]) => {
    if (store.getState().presentationMode.isActive) {
      store.dispatch(startPresentation(images));
    }
  });
}

export default configureSocket;
