import React from 'react';
import { TabType, tabs } from '../switcher/Tabs' 
import '../styles.css'

import WeatherBoard from './dashboard-elements/WeatherBoard'
import CryptoBoard from './dashboard-elements/CryptoBoard'

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
                return undefined;
            case 'currency':
                return undefined;
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