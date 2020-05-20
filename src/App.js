import React from 'react';
import RouterConfig from '@/router';
import '@/App.scss';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <RouterConfig />
      </div>
    );
  }
};