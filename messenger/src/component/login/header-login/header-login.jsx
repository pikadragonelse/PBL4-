import { Logo } from '../../logo';
import { Navigation } from '../../navigation';
import React from 'react';
import { Link } from 'react-router-dom';

import './header-login.css';

export const HeaderLogin = () => {
    return (
        <div className="header-login">
            <Link to='/' className="logo-login">
                <Logo type="logo-app" />
            </Link>
            <div className="navigation-login">
                <Navigation />
            </div>
        </div>
    );
};
