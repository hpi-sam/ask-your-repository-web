// @flow
import { Component } from 'react';
import UploadContext from './context/UploadContext';

class UploadKeyboardListener extends Component<{}> {
  static contextType = UploadContext;

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  getCurrentIndex() {
    const { uploads, selectedUploadId } = this.context;
    return uploads.findIndex(upload => upload.id === selectedUploadId);
  }

  setNextUpload() {
    const { uploads, setSelectedUpload } = this.context;
    const index = this.getCurrentIndex();
    const nextUpload = uploads[(index + 1) % uploads.length];
    setSelectedUpload(nextUpload.id);
  }

  setPrevUpload() {
    const { uploads, setSelectedUpload } = this.context;

    const index = this.getCurrentIndex();
    const prevUpload = uploads[(((index - 1) % uploads.length) + uploads.length) % uploads.length];
    setSelectedUpload(prevUpload.id);
  }

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    switch (key) {
      case 'ArrowUp':
        this.setPrevUpload();
        break;
      case 'ArrowDown':
        this.setNextUpload();
        break;
      default:
        break;
    }
  };

  render() {
    return null;
  }
}

export default UploadKeyboardListener;
