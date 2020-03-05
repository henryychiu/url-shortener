import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import App from './components/App';
import reducers from './reducers';
import { startSetUrls } from './actions/urls';
import LoadingPage from './components/LoadingPage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxThunk)));
const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.querySelector('#root'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.querySelector('#root'));

const start = async () => {
  await store.dispatch(startSetUrls());
  renderApp();
};

start();
