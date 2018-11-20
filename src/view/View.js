// @flow
import React, { Component } from 'react';
import Gallery from './Gallery';
import api from '../config/api';
import type { Artifact } from '../models/Artifact';
import './View.scss';

type Props = {};

type State = {
  artifacts: Array<Artifact>,
};

class View extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      artifacts: [],
    };
  }

  componentDidMount() {
    api.get('/images')
      .then((response) => {
        this.setArtifacts(response.data.images.slice(0));
      })
      .then(() => {});
  }

  setArtifacts(images: Array<Object>) {
    const artifacts = images.map(image => ({
      url: image._source.file_url,
      tags: image._source.tags,
    }));

    this.setState({ artifacts });
  }

  render() {
    if (!this.state.artifacts.length) {
      return null;
    }
    return (
      <div className="ImagesPage">
        <div className="IndexView">
          <Gallery artifacts={this.state.artifacts} />
        </div>
      </div>
    );
  }
}

export default View;
