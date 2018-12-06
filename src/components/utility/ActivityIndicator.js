// @flow
import React from 'react';
import classNames from 'classnames';
import { MdCropSquare } from 'react-icons/md';
import './ActivityIndicator.scss';

type Props = {
  className?: string,
  text?: string,
};

function ActivityIndicator({ text, className }: Props) {
  const styleClasses = classNames('ActivityIndicator', className);

  return (
    <div className={styleClasses}>
      <MdCropSquare className="ActivityIndicator__spinner" />
      {text && (
        <div className="ActivityIndicator__text">
          {text}
        </div>
      )}
    </div>
  );
}

ActivityIndicator.defaultProps = {
  className: '',
  text: '',
};

export default ActivityIndicator;
