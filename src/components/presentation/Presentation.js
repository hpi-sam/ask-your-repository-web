// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import type { Presentation as PresentationType } from '../../models/Presentation';
import type { AppState } from '../../state/AppState';
import './Presentation.scss';
import Search from '../search/Search';

type Props = {
  presentation: PresentationType,
};

type State = {
  activeIndex: number,
};

class Presentation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress');
  }

  handleKeyPress = (e) => {
    const { code } = e;
    if (code === 'KeyD') this.moveRight();
    if (code === 'KeyA') this.moveLeft();
  };

  moveLeft() {
    const { activeIndex } = this.state;

    if (activeIndex === 0) return;
    this.setState({ activeIndex: activeIndex - 1 });
  }

  moveRight() {
    const { presentation } = this.props;
    const { activeIndex } = this.state;

    if (presentation && activeIndex === presentation.images.length - 1) return;
    this.setState({ activeIndex: activeIndex + 1 });
  }

  getActiveImage() {
    return this.props.presentation.images[this.state.activeIndex];
  }

  getLeftImages() {
    if (!this.props.presentation) return [];
    return this.props.presentation.images
      .filter((image, index) => index < this.state.activeIndex);
  }

  getRightImages() {
    if (!this.props.presentation) return [];
    return this.props.presentation.images
      .filter((image, index) => index > this.state.activeIndex);
  }

  render() {
    const { presentation } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className="Presentation">
        <Search />
        {presentation && (
          <div className="Presentation__inner">
            {presentation.images.map((image, i) => {
              const leftIndexClassName = `Presentation__item--left--${this.getLeftImages().length - i}`;
              const rightIndexClassName = `Presentation__item--right--${i - this.getLeftImages().length}`;

              const className = classNames('Presentation__item', {
                'Presentation__item--active': i === activeIndex,
                [leftIndexClassName]: i < activeIndex,
                [rightIndexClassName]: i > activeIndex,
              });

              return (
                <img
                  src={image.url}
                  className={className}
                />
              );
            })}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  presentation: state.presentation,
});

export default connect(mapStateToProps)(Presentation);
