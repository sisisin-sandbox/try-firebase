import { UIRouterReact, UIRouter, UIView, UIRouterProps } from '@uirouter/react';
import firebase from 'firebase';
import * as React from 'react';
import { Store } from 'redux';
import './App.css';
import firebaseConfig from './firebaseConfig.json';
import { createAppStore } from './store';
import { Provider } from 'react-redux';
import { setupRouter } from './router.config';

const router = new UIRouterReact();
const store = createAppStore({ router });
export type AppState = typeof store extends Store<infer State> ? State : never;
firebase.initializeApp(firebaseConfig);
setupRouter(store, router);
const uiRouterProps: UIRouterProps = {
  router,
};

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <UIRouter {...uiRouterProps}>
          <UIView />
        </UIRouter>
      </Provider>
    );
  }
}

export default App;
