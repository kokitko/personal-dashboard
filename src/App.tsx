import React from 'react';
import './styles.css';

import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className='main-container'>
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
