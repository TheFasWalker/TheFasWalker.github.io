import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Navigation } from './navigation/Navigation';
import { setupStore } from './store/store';
// import { store } from './store';

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
