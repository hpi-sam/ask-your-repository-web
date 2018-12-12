// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import type { Presentation as PresentationType } from '../../models/Presentation';
import type { AppState } from '../../state/AppState';
import './Presentation.scss';

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
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.presentation !== this.props.presentation) {
      this.setState({ activeIndex: 0 });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  getLeftImages() {
    if (!this.props.presentation) return [];
    return this.props.presentation.images
      .filter((image, index) => index < this.state.activeIndex);
  }

  handleKeyDown = (e) => {
    const { code } = e;
    if (code === 'ArrowLeft') this.moveLeft();
    if (code === 'ArrowRight') this.moveRight();
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

  render() {
    const { presentation } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className="Presentation">
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
                <div key={image.id} className={className}>
                  <img src={image.url} alt={image.tags.join(', ')} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  presentation: state.presentation,
});

export default connect(mapStateToProps)(Presentation);
