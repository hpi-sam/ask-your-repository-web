// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Location } from 'react-router';
import { IoIosSearch } from 'react-icons/io';
import classNames from 'classnames';
import qs from 'qs';
import type { Presentation as PresentationType } from '../../models/Presentation';
import type { AppState } from '../../state/AppState';
import type { Image } from '../../models/Image';
import ImageService, { filterImages } from '../../services/ImageService';
import type { Team } from '../../models/Team';
import ListEmpty from '../utility/ListEmpty';
import ActivityIndicator from '../utility/ActivityIndicator';
import './Presentation.scss';

type Props = {
  presentation: PresentationType,
  activeTeam: ?Team,
  location: Location,
};


type State = {
  isLoadingInitially: boolean,
  activeIndex: number,
  images: Image[],
};

class Presentation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      images: [],
      isLoadingInitially: true,
      activeIndex: 0,
    };
  }

  async componentDidMount() {
    const { searching } = this.props.presentation;
    if (!searching) {
      this.loadImages();
    }
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.presentation !== this.props.presentation) {
      const { images, searching } = nextProps.presentation;
      if (!searching) {
        this.setState({ isLoadingInitially: false, activeIndex: 0, images });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  getLeftImages() {
    if (!this.state.images) return [];
    return this.state.images
      .filter((image, index) => index < this.state.activeIndex);
  }

  handleKeyDown = (e) => {
    const { code } = e;
    if (code === 'ArrowLeft') this.moveLeft();
    if (code === 'ArrowRight') this.moveRight();
  };

  getSearchString = (querystring) => {
    const { search } = qs.parse(querystring, { ignoreQueryPrefix: true });
    return search;
  };

  moveLeft() {
    const { activeIndex } = this.state;

    if (activeIndex === 0) return;
    this.setState({ activeIndex: activeIndex - 1 });
  }

  moveRight() {
    const { activeIndex, images } = this.state;

    if (activeIndex === images.length - 1) return;
    this.setState({ activeIndex: activeIndex + 1 });
  }

  async loadImages() {
    const { activeTeam } = this.props;
    if (!activeTeam) return;
    const search = this.getSearchString(this.props.location.search);

    try {
      const params = {
        teamId: activeTeam.id,
        search,
      };
      const images: Image[] = await ImageService.list(params);
      this.setState({ images: filterImages(images, 5), isLoadingInitially: false });
    } catch (error) {
      // TODO: Handle error
    }
  }

  render() {
    const { activeIndex, images, isLoadingInitially } = this.state;

    if (isLoadingInitially) {
      return (
        <ActivityIndicator
          centered
          text="Loading images..."
        />
      );
    }

    if (images.length === 0) {
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

    return (
      <div className="Presentation">
        <div className="Presentation__inner">
          {images.map((image, i) => {
            const leftIndexClassName = `Presentation__item--left--${this.getLeftImages().length - i}`;
            const rightIndexClassName = `Presentation__item--right--${i - this.getLeftImages().length}`;

            const className = classNames('Presentation__item', {
              'Presentation__item--active': i === activeIndex,
              [leftIndexClassName]: i < activeIndex,
              [rightIndexClassName]: i > activeIndex,
            });

            return (
              <div key={image.id} className={className}>
                <img src={image.url} alt={image.userTags.join(', ')} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  presentation: state.presentation,
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(Presentation);
