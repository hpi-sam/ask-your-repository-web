// @flow
import React from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import InfinityScroll from 'react-infinite-scroller';
import ActivityIndicator from '../utility/ActivityIndicator';
import type { Team } from '../../models/Team';
import type { AppState } from '../../state/AppState';
import ImagesTimeline from './ImagesTimeline';
import useImages from './useImages';
import './ImagesIndex.scss';

type Props = {
  activeTeam: ?Team,
  location: Object
};

function ImagesIndex(props: Props) {
  const query = props.location.search;
  const { search } = qs.parse(query, { ignoreQueryPrefix: true });

  const {
    images,
    loadMore,
    hasMore,
    isLoadingInitially,
  } = useImages(props.activeTeam, search);

  return (
    <div className="ImagesIndex">
      {isLoadingInitially && <ActivityIndicator />}
      <InfinityScroll
        initialLoad={false}
        hasMore={hasMore}
        loadMore={loadMore}
      >
        <ImagesTimeline images={images} />
      </InfinityScroll>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(ImagesIndex);
