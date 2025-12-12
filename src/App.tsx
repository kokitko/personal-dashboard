import React, { useState } from 'react';
import './styles.css';
import { TabType } from './switcher/Tabs';

import Header from './components/Header';
import DashboardSwitcher from './switcher/DashboardSwitcher'
import Dashboard from './components/Dashboard';
import { AuthProvider } from './auth/AuthContext';

function App() {
  const [dashboardState, setDashboardState] = useState<TabType>("weather");

  return (
    <div className='main-container'>
      <Header />
      <DashboardSwitcher dashboardState={dashboardState} setDashboardState={setDashboardState} />
      <AuthProvider>
        <Dashboard dashboardState={dashboardState} />
      </AuthProvider>
    </div>
  );
}

export default App;
