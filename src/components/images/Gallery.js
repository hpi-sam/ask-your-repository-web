// @flow
import React, { Component } from 'react';
import { View, Mask } from 'mdbreact';
import type { Image } from '../../models/Image';
import type { Tag } from '../../models/Tag';
import './Gallery.scss';

const maxTags = 5;

type Props = {
  images: Array<Image>,
};

class Gallery extends Component<Props> {
  renderOverflow = () => (
    <div className="Gallery__tag Gallery__tag--overflow">
      <p>...</p>
    </div>
  );

  renderTags = (tag: Tag, index: number) => (
    <div key={index} className="Gallery__tag">
      <p>{tag}</p>
    </div>
  );

  renderImage = (image: Image) => {
    const { url } = image;
    const tags = image.tags || [];
    const overflow = tags.length >= maxTags;

    return (
      <View key={image.id} hover>
        <img src={url} alt="" />
        <Mask overlay="black-strong" className="flex-center">
          <div className="Gallery__tags-container">
            {tags.slice(0, maxTags).map(this.renderTags)}
            {overflow && this.renderOverflow()}
          </div>
        </Mask>
      </View>
    );
  };

  render() {
    const { images } = this.props;

    return (
      <div className="Gallery">
        {images.map(this.renderImage)}
      </div>
    );
  }
}

export default Gallery;
