// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Location } from 'react-router';
import { Route } from 'react-router-dom';
import { IoIosCloudOutline, IoIosSearch } from 'react-icons/io';
import qs from 'qs';
import InfinityScroll from 'react-infinite-scroller';
import Gallery from './gallery/Gallery';
import ImageService from '../../services/ImageService';
import ImageDecorator from './gallery/ImageDecorator';
import ActivityIndicator from '../utility/ActivityIndicator';
import type { Team } from '../../models/Team';
import type { Image as APIImage } from '../../models/Image';
import type { Image } from './gallery/ImageDecorator';
import type { AppState } from '../../state/AppState';
import ListEmpty from '../utility/ListEmpty';
import { ButtonLink } from '../utility/buttons';
import ImageDetailsModal from './ImageDetailsModal';
import './ImagesIndex.scss';

type Props = {
  activeTeam: ?Team,
  location: Location,
};

type State = {
  images: Array<Image>,
  offset: number,
  endReached: boolean,
  isLoadingInitially: boolean,
};

export const limit = 20;

class ImagesIndex extends Component<Props, State> {
  defaultState = {
    images: [],
    offset: 0,
    endReached: false,
    isLoadingInitially: true,
  };

  constructor(props: Props) {
    super(props);

    this.state = this.defaultState;
  }

  async componentDidMount() {
    await this.loadMoreImages();
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
  };

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
      const images: APIImage[] = await ImageService.list(params);
      const filteredImages = images
        .filter(image => image.score === undefined || image.score > 0);
      this.receiveImages(filteredImages);
    } catch (error) {
      // TODO: Handle error
    }

    this.setState({ isLoadingInitially: false });
  };

  deleteImage = (id: string) => {
    this.setState(state => ({
      images: state.images.filter(image => image.id !== id),
    }));
  };

  increaseOffset() {
    const { offset } = this.state;
    this.setState({ offset: offset + limit });
  }

  receiveImages(fetchedImages: APIImage[]) {
    const decoratedImages = fetchedImages.map(
      image => ImageDecorator.decorateImage(image, this.deleteImage),
    );
    this.setState(state => ({ images: [...state.images, ...decoratedImages] }));

    if (fetchedImages.length === 0) {
      this.setState({ endReached: true });
    }
  }

  render() {
    const { images, isLoadingInitially } = this.state;
    const search = this.getSearchString(this.props.location.search);

    if (isLoadingInitially) {
      return (
        <ActivityIndicator
          centered
          text="Loading images..."
        />
      );
    }

    if (images.length === 0 && search) {
      return (
        <ListEmpty>
          <IoIosSearch />
          <span>
            We did not find any images
            <br />
            for your search query :(
          </span>
        </ListEmpty>
      );
    }

    if (images.length === 0) {
      return (
        <ListEmpty>
          <IoIosCloudOutline />
          <span>
            Your team has no images yet.
            <br />
            Upload your first one!
          </span>
          <ButtonLink to="/upload">
            Upload Image
          </ButtonLink>
        </ListEmpty>
      );
    }

    return (
      <div className="ImagesIndex">
        <Route path="/images/:id" component={ImageDetailsModal} />
        <InfinityScroll
          initialLoad={false}
          hasMore={!this.state.endReached}
          loadMore={this.loadMoreImages}
        >
          <Gallery images={images} />
        </InfinityScroll>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(ImagesIndex);
