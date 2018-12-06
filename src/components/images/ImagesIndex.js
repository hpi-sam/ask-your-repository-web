// @flow
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from './Gallery';
import ImageService from '../../services/ImageService';
import Search from '../search/Search';
import type { Image } from '../../models/Image';
import './ImagesIndex.scss';

type Props = {};

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

    try {
      const images = await ImageService.list({ offset: currentOffset, limit });
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
        <Search />
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

export default ImagesIndex;
