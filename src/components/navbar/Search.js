// @flow
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useRef } from 'react';
import { push } from 'connected-react-router';
import useOnClickOutside from 'use-onclickoutside';
import { useSelector, useDispatch } from 'react-redux';
import { MdSearch, MdClose } from 'react-icons/md';
import classNames from 'classnames';
import qs from 'qs';
import { synchronizedSearch } from '../../state/presentation/presentation.actionCreators';
import type { AppState } from '../../state/AppState';
import './Search.scss';

const Search = () => {
  const dispatch = useDispatch();
  const activeTeam = useSelector((state: AppState) => state.activeTeam);
  const isPresentationModeOn = useSelector((state: AppState) => state.presentationMode.isActive);
  const [search, setSearch] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsSelected(false));

  const handleSelect = () => setIsSelected(true);

  const handleClose = () => {
    setIsSelected(false);
    setSearch('');
  };

  const handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeTeam) return;

    if (isPresentationModeOn) {
      dispatch(synchronizedSearch(search));
      dispatch(push(`/presentation?${qs.stringify({ search })}`));
    } else {
      dispatch(push(`/images?${qs.stringify({ search })}`));
    }
  };

  const className = classNames('Search', {
    'Search--active': isSelected,
  });

  return (
    <form className={className} onSubmit={handleSubmit} ref={ref}>
      <MdSearch className="Search__input__icon Search__input__icon--left" />
      <input
        autoFocus
        type="text"
        value={search}
        className="Search__input"
        onChange={handleChange}
        onFocus={handleSelect}
        placeholder="Search"
      />
      {isSelected && (
        <button
          type="button"
          onClick={handleClose}
          className="Search__input__close"
        >
          <MdClose />
        </button>
      )}
    </form>
  );
};

export default Search;
