import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MonitorControl from './components/MonitorControl'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-title">
          <h1>Taufiq Smart Dorm</h1>
        </div>
          <p>
            <MonitorControl></MonitorControl>
          </p>
      </header>
		</div>
  );
}

export default App;

