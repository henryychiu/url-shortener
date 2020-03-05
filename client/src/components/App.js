import React, { Component } from 'react';
import Header from './Header';
import UrlList from './UrlList';
import ShortenerForm from './ShortenerForm';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ShortenerForm />
        <UrlList />
      </div>
    )
  }
}

export default App;