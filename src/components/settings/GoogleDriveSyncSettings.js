// @flow
import React, { Component, Fragment } from 'react';
import DeleteButton from '../utility/buttons/DeleteButton';
import ConfirmModal from '../utility/ConfirmModal';
import GoogleDriveFolderPicker from './GoogleDriveFolderPicker';
import type { Team } from '../../models/Team';
import './Settings.scss';

type Props = {
  team: Team,
};

type State = {
  hasFolder: boolean,
  showModal: boolean,
};

class GoogleDriveSyncSettings extends Component<Props,State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasFolder: this.hasFolder(),
      showModal: false,
    };
  }

  hasFolder = () => {
    // do something here
    return false;
  }

  handleModal = () => {
    this.setState( prevState => ({
      showModal: !prevState.showModal,
    }));
  }

  revokeAccess = () => {
    //do something here
  };

  render() {
    const { team } = this.props;
    const { hasFolder, showModal } = this.state;

    return (
      <Fragment>
        {showModal && (
          <ConfirmModal
            onCancel={this.handleModal}
            onContinue={this.revokeAccess}
          >
            <div> Are you sure you want to revoke the access? </div>
            <div> Your images will not be synced between your team and your Google Drive anymore. </div>
          </ConfirmModal>
        )}
        {hasFolder ? (
          <Fragment>
            <div className="Settings__item__text"> Your team is currently connected to: some folder...</div>
            <DeleteButton onClick={this.handleModal}> Revoke Access </DeleteButton>
          </Fragment>
        ) : (
          <Fragment>
            <div className="Settings__item__text"> Connect your team to a Google Drive folder to automatically sync your images. </div>
            <GoogleDriveFolderPicker team={team} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default GoogleDriveSyncSettings;
