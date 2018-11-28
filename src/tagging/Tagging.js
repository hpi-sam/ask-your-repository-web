// @flow
import React from 'react';
import { connect } from 'react-redux';
import TaggingForm from './TaggingForm';
import TaggingImagePreview from './TaggingImagePreview';
import type { Image } from '../models/Image';
import type { AppState } from '../state/AppState';
import './Tagging.scss';

type Props = {
  image: Image,
};

function Tagging(props: Props) {
  return (
    <div className="Tagging">
      <div className="Tagging__inner">
        <TaggingForm />
        <TaggingImagePreview image={props.image} />
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  image: state.image,
});

export default connect(mapStateToProps)(Tagging);
