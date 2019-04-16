// @flow
import React from 'react';
import classNames from 'classnames';
import { MdCropSquare } from 'react-icons/md';
import './ActivityIndicator.scss';

type Props = {
  className?: string,
  text?: string,
  centered: boolean,
};

function ActivityIndicator({ text, className, centered }: Props) {
  const styleClasses = classNames('ActivityIndicator', {
    '-centered': centered,
  }, className);

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
  centered: false,
};

export default ActivityIndicator;
