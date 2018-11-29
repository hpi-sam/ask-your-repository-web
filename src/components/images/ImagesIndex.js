// @flow
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from './Gallery';
import ImageService from '../../services/ImageService';
import type { Image } from '../../models/Image';
import './ImagesIndex.scss';

type Props = {};

type State = {
  images: Array<Image>,
  offset: number,
  endReached: boolean,
};

const limit = 10;

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
    const { offset } = this.state;

    try {
      const images = await ImageService.list({ offset, limit });
      this.receiveImages(images);
    } catch (error) {
      // TODO: Handle error
    }
  }

  receiveImages(fetchedImages: Image[]) {
    const { images, offset } = this.state;

    this.setState({ images: [...images, ...fetchedImages] });

    if (fetchedImages.length > 0) {
      this.setState({ offset: offset + limit });
    } else {
      this.setState({ endReached: true });
    }
  }

  render() {
    const { images } = this.state;

    return (
      <div className="ImagesIndex">
        <InfiniteScroll
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
