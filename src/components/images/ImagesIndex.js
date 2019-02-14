// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from './Gallery';
import ImageService from '../../services/ImageService';
import type { Team } from '../../models/Team';
import type { Image } from '../../models/Image';
import type { AppState } from '../../state/AppState';
import './ImagesIndex.scss';

type Props = {
  activeTeam: ?Team,
  location: Object
};

type State = {
  images: Array<Image>,
  offset: number,
  endReached: boolean,
};

export const limit = 12;

class ImagesIndex extends Component<Props, State> {
  defaultState = {
    images: [],
    offset: 0,
    endReached: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = this.defaultState;
  }

  componentDidMount() {
    this.loadMoreImages();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.activeTeam !== prevProps.activeTeam) {
      this.reloadImages();
    }
    if (this.props.location.search !== prevProps.location.search) {
      this.reloadImages();
    }
  }

  getSearchString = (querystring) => {
    const { search } = qs.parse(querystring, { ignoreQueryPrefix: true });
    return search;
  }

  reloadImages = () => {
    this.setState(this.defaultState, this.loadMoreImages);
  };

  loadMoreImages = async () => {
    if (this.state.endReached) return;

    const currentOffset = this.state.offset;
    this.increaseOffset();

    const { activeTeam } = this.props;
    if (!activeTeam) return;

    const search = this.getSearchString(this.props.location.search);

    try {
      const params = {
        teamId: activeTeam.id,
        offset: currentOffset,
        limit,
        search,
      };
      const images = await ImageService.list(params);
      const filteredImages = images
        .filter(image => image.score === undefined || image.score > 0);
      this.receiveImages(filteredImages);
    } catch (error) {
      // TODO: Handle error
    }
  };

  increaseOffset() {
    const { offset } = this.state;
    this.setState({ offset: offset + limit });
  }

  receiveImages(fetchedImages: Image[]) {
    const { images } = this.state;
    console.log(fetchedImages);

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
