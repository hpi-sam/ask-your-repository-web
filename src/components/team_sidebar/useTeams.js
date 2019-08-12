// @flow
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import TeamService from '../../services/TeamService';
import { useStoreTeams } from '../../state/teams/teams.reducer';

function useTeams() {
  const dispatch = useDispatch();
  const teams = useStoreTeams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await dispatch(TeamService.list());
      setIsLoading(false);
    })();
  }, []);

  return { teams, isLoading };
}

export default useTeams;
