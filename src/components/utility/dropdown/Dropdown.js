// @flow
import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import useOnClickOutside from 'use-onclickoutside';
import './Dropdown.scss';

type Props = {
  content: React$Node,
  trigger: React$Node,
  direction: string,
};

function Dropdown(props: Props) {
  const { trigger, content, direction } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  function handleTriggerClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`Dropdown -${direction}`} ref={ref}>
      <button
        type="button"
        onClick={handleTriggerClick}
        className="Dropdown__button"
      >
        {trigger}
      </button>
      <div
        className={classNames('Dropdown__container', {
          'Dropdown__container--active': isOpen,
        })}
      >
        <div className="Dropdown__arrow" />
        <div className="Dropdown__content">
          {content}
        </div>
      </div>
    </div>
  );
}

Dropdown.defaultProps = {
  direction: 'down',
};

export default Dropdown;
