import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import { HomeProps } from './HomeContainer';
import firebase from 'firebase';

document.addEventListener('DOMContentLoaded', function() {
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  //
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
});

export class Home extends Component<{}> {
  componentDidMount() {
    // this.props.init();
    try {
      const app = firebase.app();
      const features = (['auth', 'database', 'messaging', 'storage'] as [
        'auth',
        'database',
        'messaging',
        'storage'
      ]).filter(feature => typeof app[feature] === 'function');

      console.log(`Firebase SDK loaded with ${features.join(', ')}`);
    } catch (e) {
      console.error(e);
      console.log('Error loading the Firebase SDK, check the console.');
    }
  }
  render() {
    return (
      <>
        <div id="message">
          <h2>Welcomeback</h2>
          <h1>Firebase Hosting Setup Complete</h1>
          <p>
            You're seeing this because you've successfully setup Firebase Hosting. Now it's time to
            go build something extraordinary!
          </p>
          <a target="_blank" href="https://firebase.google.com/docs/hosting/">
            Open Hosting Documentation
          </a>
        </div>
        <p id="load">Firebase SDK Loading&hellip;</p>
      </>
    );
  }
}
