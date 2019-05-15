// @flow
import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import useImage from './useImage';
import OverlayModal from '../utility/modals/OverlayModal';
import ActivityIndicator from '../utility/ActivityIndicator';
import RelatedImages from './RelatedImages';
import './ImageDetailsModal.scss';
import ImageTagsOverview from './ImageTagsOverview';
import { ButtonLink } from '../utility/buttons';
import ImageFaceForm from './ImageFaceForm';

type Props = {
  dispatch: Function,
  match: {
    params: { id: string }
  },
};

function ImageDetailsModal(props: Props) {
  const { image } = useImage(props.match.params.id);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  function handleClose() {
    props.dispatch(push('/images'));
  }

  return (
    <OverlayModal
      onClose={handleClose}
      isOpen
    >
      {image ? (
        <div className="ImageDetailsModal" key={image.id}>
          <ImageTagsOverview image={image} />
          <div className="ImageDetailsModal__image-container">
            <img
              className="ImageDetailsModal__image"
              src={image.url}
              alt={image.userTags.join(' ')}
            />
            <div className="ImageDetailsModal__image__face-box-container">
              {image.faces.map(face => (
                <ImageFaceForm face={face} />
              ))}
            </div>
          </div>
          <div>
            <h2>Similar Images</h2>
            <RelatedImages baseImageId={image.id} />
          </div>
        </div>
      ) : (
        <ActivityIndicator />
      )}
    </OverlayModal>
  );
}

export default connect()(ImageDetailsModal);
