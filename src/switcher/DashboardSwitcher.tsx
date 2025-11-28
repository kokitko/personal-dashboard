import React from 'react';
import { TabType, tabs } from "./Tabs";
import './switcher.css'

interface Props {
    dashboardState: TabType;
    setDashboardState: React.Dispatch<React.SetStateAction<TabType>>;
}

const DashboardSwitcher = ({dashboardState, setDashboardState}: Props) => {
    return (<div className='dashboard-switcher'>
        <div className='switcher'>
            {tabs.map(tab => (
               <button 
                    key={tab.id}
                    className={`switcher-btn ${dashboardState === tab.id ? 'active' : ''}`}
                    onClick={() => setDashboardState(tab.id)}
               >
                {tab.label}
               </button> 
            ))}
        </div>
    </div>)
}

export default DashboardSwitcher;