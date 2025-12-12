import React from 'react';
import { TabType, tabs } from '../switcher/Tabs' 
import '../styles.css'

import WeatherBoard from './dashboard-elements/WeatherBoard'
import CryptoBoard from './dashboard-elements/CryptoBoard'
import TodoBoard from './dashboard-elements/TodoBoard'
import CurrencyBoard from './dashboard-elements/CurrencyBoard'
import NewsBoard from './dashboard-elements/NewsBoard';
import RegisterBoard from './dashboard-elements/RegisterBoard';
import { useAuth } from '../auth/AuthContext';

interface Props {
    dashboardState: TabType;
}

const Dashboard = ({dashboardState}: Props) => {
    const { isAuthenticated, ready } = useAuth();

    const handleState = () => {
        switch (dashboardState) {
            case 'weather':
                return <WeatherBoard />;
            case 'crypto':
                return <CryptoBoard />;
            case 'todo':
                if (!ready) {
                    return <div className='dashboard'>Loading...</div>;
                } else if (!isAuthenticated) {
                    return <RegisterBoard />;
                } else {
                    return <TodoBoard />;
                }   
            case 'currency':
                return <CurrencyBoard />;
            case 'news':
                return <NewsBoard />; 
        }
    }
    
    return (
        <div className='dashboard'>
            {handleState()}
        </div>
    )
}

export default Dashboard;