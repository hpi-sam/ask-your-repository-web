// @flow
import React, { Component } from 'react';
import { blobToDataURL } from 'blob-util';
import classNames from 'classnames';
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline, IoIosRadioButtonOn } from 'react-icons/io';
import type { Upload } from '../../models/Upload';

type Props = {
  upload: Upload,
  index: number,
  isSelected: boolean,
  onClick: (id: string) => void,
};

type State = {
  dataUri: ?string,
};

class FileUploadListItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      dataUri: null,
    };
  }

  async componentDidMount() {
    const dataUri = await blobToDataURL(this.props.upload.file);
    this.setState({ dataUri });
  }

  handleClick = () => {
    const { onClick, upload } = this.props;

    if (upload.status === 'failed') {
      upload.retry();
    }

    onClick(upload.id);
  };

  renderItemStatus = (upload: Upload) => {
    let icon;

    switch (upload.status) {
      case 'succeeded':
        icon = <IoIosCheckmarkCircleOutline />;
        break;
      case 'failed':
        icon = <IoIosCloseCircleOutline />;
        break;
      default:
        icon = <IoIosRadioButtonOn />;
        break;
    }

    const className = classNames('UploadList__item__status', {
      'UploadList__item__status--success': upload.status === 'succeeded',
      'UploadList__item__status--failed': upload.status === 'failed',
      'UploadList__item__status--ongoing': upload.status === 'ongoing',
    });

    return (
      <span className={className}>
        {icon}
      </span>
    );
  };

  render() {
    const { upload, index, isSelected } = this.props;
    const { dataUri } = this.state;

    const className = classNames('UploadList__item', 'UploadList__item--small', {
      'UploadList__item--selected': isSelected,
    });

    return (
      <button
        type="button"
        onClick={this.handleClick}
        className={className}
        style={{
          animationDelay: `${index * 0.05}s`,
        }}
        data-cy="upload-list-item"
      >
        {dataUri ? (
          <div
            className="UploadList__item__image"
            style={{ backgroundImage: `url(${dataUri})` }}
          />
        ) : <div className="UploadList__item__image-placeholder" />}
        <div className="UploadList__item__info">
          <span>{upload.file.name}</span>
          {this.renderItemStatus(upload)}
        </div>
      </button>
    );
  }
}

export default FileUploadListItem;
