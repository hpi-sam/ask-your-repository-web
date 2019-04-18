// @flow
import React from 'react';
import classNames from 'classnames';
import LegalList from './LegalList';
import './Footer.scss';

type Props = {
  fixed: boolean,
  hide: boolean,
};

function Footer(props: Props) {
  const className = classNames('Footer', {
    '-fixed': props.fixed,
    '-hide': props.hide,
  });

  return (
    <footer className={className}>
      <div className="Footer__inner">
        <span className="Footer__copyright">
          &copy;2019 AskYour.Cloud
        </span>
        <LegalList />
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  fixed: false,
  hide: false,
};

export default Footer;
