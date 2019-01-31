// @flow
import React, { Component } from 'react';
import ImageService from '../../services/ImageService';
import ActivityInidicator from '../utility/ActivityIndicator';
import Tagging from '../tagging/Tagging';

import './Detail.scss';

import type { Image } from '../../models/Image';


type Props = {
  match: {
    params: { id: string }
  },
}
type State = {
  image: ?Image,
}


class Edit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      image: null,
    };
  }

  async componentDidMount() {
    const newImage = await ImageService.get(this.props.match.params.id);
    this.setState({ image: newImage });
  }

  render() {
    if (!this.state.image) {
      return <ActivityInidicator />;
    }
    return (
      <Tagging image={this.state.image} />
    );
  }
}
export default Edit;
