import React from 'react';

import { Logo } from '../../logo';
import { Navigation } from '../../navigation';

import './header-login.css';

export const HeaderLogin = () => {
    return (
        <div className="header-login">
            <div className="logo-login">
                <Logo type="logo-app" />
            </div>
            <div className="navigation-login">
                <Navigation />
            </div>
        </div>
    );
};
