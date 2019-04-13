// @flow
import React, { Fragment } from 'react';
import classNames from 'classnames';
import { IoIosImages } from 'react-icons/io';
import { MdAccessTime } from 'react-icons/md';
import Toolbar from '../utility/Toolbar';
import { Button } from '../utility/buttons';

type View = 'timeline' | 'gallery';

type Props = {
  view: View,
  setView: (view: View) => void,
};

function ImagesIndexToolbar(props: Props) {
  const { view: selectedView, setView } = props;

  function renderViewButton(view: View, text: string, Icon: React$Component) {
    return (
      <Button
        onClick={() => setView(view)}
        className={classNames({ '-selected': selectedView === view })}
      >
        <Icon />
        <span>{text}</span>
      </Button>
    );
  }

  return (
    <Toolbar
      right={(
        <Fragment>
          {renderViewButton('gallery', 'Gallery View', IoIosImages)}
          {renderViewButton('timeline', 'Timeline View', MdAccessTime)}
        </Fragment>
      )}
    />
  );
}

export default ImagesIndexToolbar;
