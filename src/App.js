import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './features/home/Home';
import Graph from './features/graph/Graph';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/graph" component={Graph} />
      </Router>
    );
  }
}

export default App;
