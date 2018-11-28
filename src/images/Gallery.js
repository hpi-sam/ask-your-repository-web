// @flow
import React, { Component } from 'react';
import { View, Mask } from 'mdbreact';
import type { Artifact } from '../models/Artifact';
import './Gallery.scss';

const maxTags = 5;

type Props = {
  artifacts: Array<Artifact>,
};

class Gallery extends Component<Props> {
  renderOverflow = () => (
    <div className="Gallery__tag Gallery__tag--overflow">
      <p>...</p>
    </div>
  );

  renderTags = (tag: string, index: number) => (
    <div key={index} className="Gallery__tag">
      <p>{tag}</p>
    </div>
  );

  renderImage = (artifact: Artifact) => {
    const { tags } = artifact;
    const src = artifact.url;
    const overflow = tags.length >= maxTags;

    return (
      <View key={artifact.id} hover>
        <img src={src} alt="" />
        <Mask overlay="black-strong" className="flex-center">
          <div className="Gallery__tags-container">
            {tags.map(this.renderTags)}
            {overflow && this.renderOverflow()}
          </div>
        </Mask>
      </View>
    );
  };

  render() {
    const { artifacts } = this.props;

    return (
      <div className="Gallery">
        {artifacts.map(this.renderImage)}
      </div>
    );
  }
}

export default Gallery;
