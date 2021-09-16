import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/main';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Main}/>
      </div>
    </Router>
  );
}

// nasa key: e5sDlcdCjk5iQx3XbCMP96d3Iz4cZr7bRfJmHrQJ

export default App;
