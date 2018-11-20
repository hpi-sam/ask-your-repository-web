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
    <div className="tag overflow-tag">
      <p>...</p>
    </div>
  );

  renderTags = (src: string) => (
    <div className="tag img-tag">
      <p>{src}</p>
    </div>
  );

  renderImageContent = (artifact: Artifact) => {
    let overflow = false;
    const src = artifact.url;
    const { tags } = artifact;

    if (tags.length >= maxTags) {
      overflow = true;
    }

    return (
      <View hover>
        <img src={src} alt="" />
        <Mask className="flex-center" overlay="black-strong">
          <div className="white-text tag-box">
            {tags.slice(0, 5).map(this.renderTags)}
            {overflow ? this.renderOverflow() : ''}
          </div>
        </Mask>
      </View>
    );
  };

  render() {
    return (
      <div className="gallery-container">
        <div className="gallery-grid">
          {this.props.artifacts.map(this.renderImageContent)}
        </div>
      </div>
    );
  }
}

export default Gallery;
