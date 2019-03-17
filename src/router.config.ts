import {
  pushStateLocationPlugin,
  ReactStateDeclaration,
  servicesPlugin,
  UIRouterReact,
} from '@uirouter/react';
import { AnyAction, Store } from 'redux';
import { AppState } from './App';
import { HomeContainer } from './modules/home/HomeContainer';
// import { LoginContainer } from './modules/login/LoginContainer';

export function createRouterStates(store: Store<AppState, AnyAction>): ReactStateDeclaration[] {
  return [
    {
      name: 'home',
      url: '/',
      component: HomeContainer,
      data: { requiresAuth: true },
    },
  ];
}

export function setupRouter(store: Store<AppState, AnyAction>, router: UIRouterReact) {
  // initialize router
  router.plugin(servicesPlugin);
  router.plugin(pushStateLocationPlugin);
  createRouterStates(store).forEach(s => router.stateRegistry.register(s));

  // application behavior
  router.urlRouter.otherwise('/404');

  router.transitionService.onBefore(
    {
      to(state) {
        return state && state.data && state.data.requiresAuth;
      },
    },
    async transition => {
      const isAuthed = true;
      if (isAuthed) {
        return;
      } else {
        return transition.router.stateService.target('login');
      }
    },
  );
}
