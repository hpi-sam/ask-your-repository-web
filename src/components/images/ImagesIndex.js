// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from './Gallery';
import ImageService from '../../services/ImageService';
import type { Team } from '../../models/Team';
import type { Image } from '../../models/Image';
import type { AppState } from '../../state/AppState';
import './ImagesIndex.scss';

type Props = {
  activeTeam: ?Team,
};

type State = {
  images: Array<Image>,
  offset: number,
  endReached: boolean,
};

export const limit = 12;

class ImagesIndex extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      images: [],
      offset: 0,
      endReached: false,
    };
  }

  componentDidMount() {
    this.loadMoreImages();
  }

  loadMoreImages = async () => {
    if (this.state.endReached) return;

    const currentOffset = this.state.offset;
    this.increaseOffset();

    if (!this.props.activeTeam) return;

    try {
      const params = {
        teamId: this.props.activeTeam.id,
        offset: currentOffset,
        limit,
      };
      const images = await ImageService.list(params);
      this.receiveImages(images);
    } catch (error) {
      // TODO: Handle error
    }
  }

  increaseOffset() {
    const { offset } = this.state;
    this.setState({ offset: offset + limit });
  }

  receiveImages(fetchedImages: Image[]) {
    const { images } = this.state;

    this.setState({ images: [...images, ...fetchedImages] });

    if (fetchedImages.length === 0) {
      this.setState({ endReached: true });
    }
  }

  render() {
    const { images } = this.state;

    return (
      <div className="ImagesIndex">
        <InfiniteScroll
          initialLoad={false}
          hasMore={!this.state.endReached}
          loadMore={this.loadMoreImages}
        >
          <Gallery images={images} />
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(ImagesIndex);
