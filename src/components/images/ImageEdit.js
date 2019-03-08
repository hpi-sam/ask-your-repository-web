// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ImageService from '../../services/ImageService';
import ActivityInidicator from '../utility/ActivityIndicator';
import type { Image } from '../../models/Image';
import MobileTagging from '../tagging/MobileTagging';
import type { Tag } from '../../models/Tag';

export type TaggableImage = Image & {
  addTag: (tag: Tag) => void,
  removeTag: (tag: Tag) => void,
};

type Props = {
  match: {
    params: { id: string },
  },
};

type State = {
  image: ?TaggableImage,
  isSubmitted: boolean,
};

class ImageEdit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      image: null,
      isSubmitted: false,
    };
  }

  async componentDidMount() {
    const image = await ImageService.get(this.props.match.params.id);
    const taggableImage: TaggableImage = {
      ...image,
      addTag: this.addTag,
      removeTag: this.removeTag,
    };

    this.setState({ image: taggableImage });
  }

  handleSubmit = async () => {
    const { image } = this.state;

    console.log(image);
    if (!image) return;

    const { id, userTags } = image;
    await ImageService.patch(id, { tags: userTags });
    this.setState({ isSubmitted: true });
  };

  addTag = (tag: Tag) => {
    const { image } = this.state;
    if (!image || image.userTags.includes(tag)) return;

    this.setState({
      image: { ...image, userTags: [...image.userTags, tag] },
    });
  };

  removeTag = (tag: Tag) => {
    this.setState(state => ({
      image: state.image && {
        ...state.image,
        userTags: state.image.userTags.filter(existingTag => existingTag !== tag),
      },
    }));
  };

  render() {
    const { image, isSubmitted } = this.state;

    if (!image) return <ActivityInidicator />;

    if (isSubmitted) return <Redirect to={`/images/${image.id}`} />;

    return (
      <MobileTagging
        image={image}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default ImageEdit;
