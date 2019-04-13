// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import InfinityScroll from 'react-infinite-scroller';
import ActivityIndicator from '../utility/ActivityIndicator';
import type { Team } from '../../models/Team';
import type { AppState } from '../../state/AppState';
import ImagesTimeline from './ImagesTimeline';
import useImages from './useImages';
import './ImagesIndex.scss';
import { Button } from '../utility/buttons';
import ImagesIndexToolbar from './ImagesIndexToolbar';
import Gallery from './gallery/Gallery';

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

  const [view, setView] = useState<'timeline' | 'gallery'>('gallery');

  return (
    <div className="ImagesIndex">
      <InfinityScroll
        initialLoad={false}
        hasMore={hasMore}
        loadMore={loadMore}
      >
        <ImagesIndexToolbar
          view={view}
          setView={setView}
        />
        {isLoadingInitially && <ActivityIndicator />}
        {view === 'timeline' && (
          <ImagesTimeline images={images} />
        )}
        {view === 'gallery' && (
          <Gallery images={images} />
        )}
      </InfinityScroll>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(ImagesIndex);
