import React from 'react';
import ReactDOM from 'react-dom';
import resize from '@/utils/resize';
import App from '@/App';
import 'antd-mobile/dist/antd-mobile.css'; 
import '@/index.scss';
import '@/styles/iconfont.css';
import * as serviceWorker from './serviceWorker';

resize();

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
