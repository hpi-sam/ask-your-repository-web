// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import ImageService from '../../services/ImageService';
import ActivityInidicator from '../utility/ActivityIndicator';
import SingleTagging from '../tagging/SingleTagging';
import { SaveButton, ButtonLink } from '../utility/buttons';
import Toolbar from '../utility/Toolbar';
import type { Image } from '../../models/Image';
import type { Tag } from '../../models/Tag';

type Props = {
  match: {
    params: { id: string },
  },
};

type State = {
  image: ?Image,
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
    this.setState({ image });
  }

  handleSubmit = async () => {
    const { image } = this.state;
    if (!image) return;

    const { id, userTags } = image;
    await ImageService.patch(id, { tags: userTags });
    this.setState({ isSubmitted: true });
  };

  handleTagsChange = (userTags: Tag[]) => {
    this.setState(state => ({
      image: {
        ...state.image,
        userTags,
      },
    }));
  };

  render() {
    const { image, isSubmitted } = this.state;

    if (!image) return <ActivityInidicator />;

    if (isSubmitted) return <Redirect to={`/images/${image.id}`} />;

    return (
      <div>
        <Toolbar>
          <ButtonLink to={`/images/${image.id}`}>
            <IoIosArrowRoundBack />
            <span>Back to image</span>
          </ButtonLink>
        </Toolbar>
        <SingleTagging
          image={image}
          onTagsChange={this.handleTagsChange}
        />
        <SaveButton onClick={this.handleSubmit}>
          Save
        </SaveButton>
      </div>
    );
  }
}

export default ImageEdit;
