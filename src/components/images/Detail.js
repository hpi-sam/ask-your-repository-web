// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import shortid from 'shortid';
import ImageService from '../../services/ImageService';
import ActivityInidicator from '../utility/ActivityIndicator';
import Tag from '../utility/Tag';

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


class Detail extends Component<Props, State> {
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
      <div className="ImageDetail">
        <Link to={`/images/${this.state.image.id}/edit`}>
          <MdEdit className="ImageDetail__edit-button" />
        </Link>
        <div className="ImageDetail__container">
          <img src={this.state.image.url} alt="" />
          <div className="ImageDetail__tag-list">
            <p>Tags:</p>
            {this.state.image.tags.map(tag => (
              <Tag
                key={shortid.generate()}
                className="ImageDetail__tag"
                caption={tag}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Detail;
