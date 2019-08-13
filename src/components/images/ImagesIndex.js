// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Location } from 'react-router-dom';
import { IoIosCloudOutline, IoIosSearch } from 'react-icons/io';
import qs from 'qs';
import InfinityScroll from 'react-infinite-scroller';
import Gallery from './gallery/Gallery';
import ActivityIndicator from '../utility/ActivityIndicator';
import type { Team } from '../../models/Team';
import type { AppState } from '../../state/AppState';
import ListEmpty from '../utility/ListEmpty';
import { ButtonLink } from '../utility/buttons';
import useImages from './useImages';
import './ImagesIndex.scss';

type Props = {
  activeTeam: ?Team,
  location: Location,
};

function ImagesIndex(props: Props) {
  const query = props.location.search;
  const { search } = qs.parse(query, { ignoreQueryPrefix: true });

  const {
    images,
    loadMore,
    hasMore,
    isLoadingMore,
    isLoadingInitially,
  } = useImages(props.activeTeam, search);

  if (isLoadingInitially) {
    return (
      <ActivityIndicator
        centered
        text="Loading images..."
      />
    );
  }

  if (images.length === 0 && search) {
    return (
      <ListEmpty>
        <IoIosSearch />
        <span>
          We did not find any images
          <br />
          for your search query :(
        </span>
      </ListEmpty>
    );
  }

  if (images.length === 0) {
    return (
      <ListEmpty>
        <IoIosCloudOutline />
        <span>
          Your team has no images yet.
          <br />
          Upload your first one!
        </span>
        <ButtonLink to="/upload">
          Upload Image
        </ButtonLink>
      </ListEmpty>
    );
  }

  return (
    <div className="ImagesIndex">
      <InfinityScroll
        initialLoad={false}
        hasMore={hasMore}
        loadMore={loadMore}
      >
        <Gallery
          images={images}
          isLoading={isLoadingMore}
        />
      </InfinityScroll>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(ImagesIndex);
