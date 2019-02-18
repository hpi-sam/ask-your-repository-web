// @flow
import React, { Component } from 'react';
import ImageService from '../../services/ImageService';
import ActivityInidicator from '../utility/ActivityIndicator';
import SingleTagging from '../tagging/SingleTagging';
import SaveButton from '../utility/SaveButton';
import type { Tag } from '../../models/Tag';
import type { Image } from '../../models/Image';
import './Detail.scss';

type Props = {
  match: {
    params: { id: string },
  },
};

type State = {
  image: ?Image,
};

class Edit extends Component<Props, State> {
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

  handleSubmit = async () => {
    const { image } = this.state;
    if (!image) return;

    const { id, tags } = image;
    await ImageService.patch(id, { tags });
  };

  handleTagsChange = (tags: Tag[]) => {
    this.setState(state => ({
      image: {
        ...state.image,
        tags,
      },
    }));
  };

  render() {
    if (!this.state.image) {
      return <ActivityInidicator />;
    }
    return (
      <div>
        <SingleTagging
          image={this.state.image}
          onTagsChange={this.handleTagsChange}
        />
        <SaveButton onClick={this.handleSubmit}>
          Bearbeiten
        </SaveButton>
      </div>
    );
  }
}
export default Edit;
