// @flow
import React, { Component } from 'react';
import shortid from 'shortid';
import ImageService from '../../services/ImageService';
import ActivityInidicator from '../utility/ActivityIndicator';
import ImageDetailsToolbar from './ImageDetailsToolbar';
import Tag from '../utility/tags/Tag';
import type { Image } from '../../models/Image';
import './ImageDetails.scss';

type Props = {
  match: {
    params: { id: string }
  },
};

type State = {
  image: ?Image,
};

class ImageDetail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      image: null,
    };
  }

  async componentDidMount() {
    const image = await ImageService.get(this.props.match.params.id);
    this.setState({ image });
  }

  render() {
    const { image } = this.state;

    if (!image) return <ActivityInidicator centered />;

    return (
      <div className="ImageDetails">
        <ImageDetailsToolbar image={image} />
        <div className="ImageDetails__container">
          <img
            className="ImageDetails__image"
            src={image.url}
            alt={image.userTags.join(' ')}
          />
          <div className="ImageDetails__info">
            <div className="ImageDetail__tag-list">
              {image.userTags.map(tag => (
                <Tag
                  key={shortid.generate()}
                  className="ImageDetail__tag"
                  caption={tag}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDetail;
