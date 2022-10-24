import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import 'antd/dist/antd.css';
import reducer from './storage/reducer';
import App from './components/app';

const store = createStore(reducer, applyMiddleware(reduxThunk));

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
