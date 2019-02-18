// @flow
import { Component } from 'react';
import type { Upload } from '../../models/Upload';

type Props = {
  uploads: Array<Upload>,
  selectedUploadId: string,
  onSelectedChange: (uploadId: string) => void,
};
class UploadKeyboardListener extends Component<Props> {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  getCurrentIndex() {
    const { uploads, selectedUploadId } = this.props;
    return uploads.findIndex(upload => upload.id === selectedUploadId);
  }

  setNextUpload() {
    const { uploads, onSelectedChange } = this.props;
    const index = this.getCurrentIndex();
    const nextUpload = uploads[(index + 1) % uploads.length];
    onSelectedChange(nextUpload.id);
  }

  setPrevUpload() {
    const { uploads, onSelectedChange } = this.props;

    const index = this.getCurrentIndex();
    const prevUpload = uploads[(((index - 1) % uploads.length) + uploads.length) % uploads.length];
    onSelectedChange(prevUpload.id);
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
