import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Store
import {createStore} from 'redux';
import { myReducer } from './reducers/index';
import { Provider } from 'react-redux';

const store = createStore(  
  myReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
