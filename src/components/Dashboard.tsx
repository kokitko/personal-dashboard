import React from 'react';
import { TabType, tabs } from '../switcher/Tabs' 
import '../styles.css'

import WeatherBoard from './dashboard-elements/WeatherBoard'
import CryptoBoard from './dashboard-elements/CryptoBoard'
import TodoBoard from './dashboard-elements/TodoBoard'
import CurrencyBoard from './dashboard-elements/CurrencyBoard'

interface Props {
    dashboardState: TabType;
}

const Dashboard = ({dashboardState}: Props) => {
    
    const handleState = () => {
        switch (dashboardState) {
            case 'weather':
                return <WeatherBoard />;
            case 'crypto':
                return <CryptoBoard />;
            case 'todo':
                return <TodoBoard />;
            case 'currency':
                return <CurrencyBoard />;
            case 'news':
                return undefined; 
        }
    }
    
    return (
        <div className='dashboard'>
            {handleState()}
        </div>
    )
}

export default Dashboard;