// @flow
import React, { Component } from 'react';
import { MdShare } from 'react-icons/md';
import onClickOutside from 'react-onclickoutside';
import {
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import './SocialShareToolbar.scss';

type Props = {
  image: string,
  tags: string,
};

type State = {
  isSelected: boolean,
};

class SocialShareDropdown extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = { isSelected: false };
  }

  handleClick = () => {
    this.setState(state => ({ isSelected: !state.isSelected }));
  };

  handleClickOutside = () => {
    this.setState({ isSelected: false });
  };

  render() {
    const { isSelected } = this.state;
    const { image, tags } = this.props;
    const message = `Check out this image I have uploaded to askyour.cloud:\n\n${image}\n\nTags: ${tags}`;

    return (
      <div className="SocialShareToolbar">
        <div className="SocialShareToolbar__dropdown">
          <button
            type="button"
            onClick={this.handleClick}
            className="Button SocialShareToolbar__dropdown__button"
            data-cy="user-dropdown-button"
          >
            <MdShare />
            <span>Share</span>
          </button>
          <div className={isSelected ? 'SocialShareToolbar__dropdown__content SocialShareToolbar__dropdown__content--active' : 'SocialShareToolbar__dropdown__content'}>
            <WhatsappShareButton
              url={message}
              className="SocialShareToolbar__dropdown__content__item"
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>

            <TelegramShareButton
              url={message}
              className="SocialShareToolbar__dropdown__content__item"
            >
              <TelegramIcon size={32} round={true} />
            </TelegramShareButton>

            <EmailShareButton
              url={message}
              subject="I want to share an image from askyour.cloud with you"
              className="SocialShareToolbar__dropdown__content__item"
            >
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(SocialShareDropdown);
