import { createAggregate } from '@sisisin/redux-aggregate';
import { AnyAction } from 'redux';
import { Epic } from 'redux-observable';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AppState } from '../../App';
import { HomeResponse } from '../../entity/HomeResponse';
import { combineActionFilters, createActionFilters } from '../../services/createActionFilters';
import { httpClient } from '../../services/HttpClient';

export interface HomeState {
  x: string | null;
}

const homeMT = {
  setX(state: HomeState, payload: string): HomeState {
    return state;
  },
  init(state: HomeState): HomeState {
    return state;
  },
  initFullfilled(state: HomeState, res: HomeResponse): HomeState {
    return { x: res.home };
  },
  setState(state: HomeState, newState: HomeState): HomeState {
    return newState;
  },
};

export const homeAggregate = createAggregate(homeMT, 'home/');
export const homeFilters = createActionFilters(homeAggregate);

export const homeReducer = homeAggregate.reducerFactory<HomeState>({ x: null });

let x = 0;
export const homeEpics: {
  fetchHome: Epic<AnyAction, AnyAction, AppState, {}>;
} = {
  fetchHome: (action$, state$, dependencies) =>
    action$.pipe(
      filter(combineActionFilters([homeFilters.init, homeFilters.setX])),
      mergeMap(() => httpClient.get('http://home')),
      map(res => homeAggregate.creators.initFullfilled({ home: `got ${x++}` })),
    ),
};
