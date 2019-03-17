import { UIRouterReact } from '@uirouter/react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { homeEpics, homeReducer } from './modules/home/HomeMT';

export interface EpicDependencies {
  router: UIRouterReact;
}

export function createAppStore(dependencies: EpicDependencies) {
  const epics = combineEpics(...Object.values(homeEpics));
  const epicMiddleware = createEpicMiddleware({ dependencies });

  const store = createStore(
    combineReducers({ home: homeReducer }),
    applyMiddleware(epicMiddleware),
  );

  epicMiddleware.run(epics as any);

  return store;
}
