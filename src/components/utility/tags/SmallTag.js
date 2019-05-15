// @flow
import React from 'react';
import classNames from 'classnames';
import Tag from './Tag';
import type { Props as TagProps } from './Tag';

function SmallTag({
  className,
  ...rest
}: TagProps) {
  return (
    <Tag
      className={classNames('Tag--small', className)}
      {...rest}
    />
  );
}

export default SmallTag;
