import React from 'react';
import './App.css';
import { Navigation } from './navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './store';




function App() {



  return (
    <Provider store={store}>
      <Navigation />
    </Provider>

  );
}

export default App;
