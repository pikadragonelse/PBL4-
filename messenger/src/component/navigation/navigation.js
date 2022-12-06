import React from 'react';
import { NavItem } from './nav-item';

import './navigation.css';

export const Navigation = () => {
    const navItemContent = ['Rooms', 'Features', 'Desktop apps', 'Privacy and safety', 'For developer'];

    return (
        <nav className="navigation-app">
            {navItemContent.map((item, index) => (
                <NavItem key={index} content={item} />
            ))}
        </nav>
    );
};
