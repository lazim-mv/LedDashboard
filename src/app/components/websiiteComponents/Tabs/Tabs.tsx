"use client"
import React, { useState } from 'react';
import styles from './tabs.module.css';
import HomePage from '../HomePage/HomePage';
import AboutPage from '../AboutPage/AboutPage';
import Blogs from '../Blogs/Blogs';
// import HomePage from './HomePage';
// import AboutPage from './AboutPage';
// import Blogs from './Blogs';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, label: 'Home Page', component: <HomePage /> },
        { id: 1, label: 'About Page', component: <AboutPage /> },
        { id: 2, label: 'Blogs', component: <Blogs /> },
    ];

    const renderActiveComponent = () => {
        return tabs[activeTab].component;
    };

    return (
        <div className={styles.tabsContainer}>
            <nav className={styles.tabsNav}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                    >
                        {tab.label}
                        {activeTab === tab.id && <div className={styles.activeIndicator} />}
                    </button>
                ))}
            </nav>
            <div className={styles.tabContent}>
                {renderActiveComponent()}
            </div>
        </div>
    );
};

export default Tabs;