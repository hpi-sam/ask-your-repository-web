// @flow
import React from 'react';
import uniq from 'lodash/uniq';
import Moment from 'react-moment';
import Gallery from './gallery/Gallery';
import type { Image } from '../../models/Image';
import './ImagesTimeline.scss';

type Props = {
  images: Array<Image>,
};

function getDateStringWithoutTime(date: string): string {
  return new Date(new Date(date).toDateString()).toDateString();
}

function ImagesTimeline(props: Props) {
  const { images } = props;

  const dateStrings: string[] = images.map(image => getDateStringWithoutTime(image.fileDate));
  const dates: Date[] = uniq(dateStrings).map(string => new Date(string));

  function getImagesFromDate(compareDate: Date) {
    return images.filter((image) => {
      const imageDate = getDateStringWithoutTime(image.fileDate);
      return compareDate.toDateString() === imageDate;
    });
  }

  return (
    <div className="ImagesTimeline">
      {dates.map(date => (
        <div className="ImagesTimeline__item">
          <header className="ImagesTimeline__item__header">
            <Moment
              date={date}
              format="dddd, MMMM DD"
              className="ImagesTimeline__item__header__date"
            />
          </header>
          <Gallery images={getImagesFromDate(date)} />
        </div>
      ))}
    </div>
  );
}

export default ImagesTimeline;
