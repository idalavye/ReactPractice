import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Browser Router'ı App.js veya index.js 'de kullanabilir. Tüm child componentleri alacak 
 * şekilde tanımlamak için.
 */

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      // <BrowserRouter basename="/my-app">
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
