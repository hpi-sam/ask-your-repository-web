// @flow
import React, { useState, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import './ImageFaceForm.scss';
import api from '../../config/api';

type Props = {
  face: Object,
};

function ImageFaceForm(props: Props) {
  const [name, setName] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const { face } = props;
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsInputVisible(false));

  function handleNameChange(e: SyntheticInputEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleBoundingBoxClick() {
    setIsInputVisible(true);
  }

  async function handleFormSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    await api.put(`/faces/${face.id}`, {
      name,
    });
  }

  const x1 = face.boundingBox[0] * 100;
  const y1 = face.boundingBox[1] * 100;
  const x2 = face.boundingBox[2] * 100;
  const y2 = face.boundingBox[3] * 100;
  const inputWidth = 120;

  return (
    <form
      className="ImageFaceForm"
      ref={ref}
      onSubmit={handleFormSubmit}
    >
      <button
        type="button"
        onClick={handleBoundingBoxClick}
        className="ImageFaceForm__bounding-box"
        style={{
          left: `${x1}%`,
          top: `${y1}%`,
          width: `${x2 - x1}%`,
          height: `${y2 - y1}%`,
        }}
      />
      {!isInputVisible && face.person && face.person.length > 0 && (
        <div
          className="ImageFaceForm__name"
          style={{
            width: `${inputWidth}px`,
            left: `calc(${x1 + (x2 - x1) / 2}% - ${inputWidth / 2}px)`,
            top: `${y2}%`,
          }}
        >
          {face.person[0]}
        </div>
      )}
      {isInputVisible && (
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="ImageFaceForm__input"
          placeholder="Type Name"
          style={{
            width: `${inputWidth}px`,
            left: `calc(${x1 + (x2 - x1) / 2}% - ${inputWidth / 2}px)`,
            top: `${y2}%`,
          }}
        />
      )}
    </form>
  );
}

export default ImageFaceForm;
