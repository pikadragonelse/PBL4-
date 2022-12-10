import { HeaderLogin } from './header-login';
import { LoginContent } from './login-content';
import React from 'react';

import './login.css';
export const Login = () => {
    return (
        <div className="login-container">
            <HeaderLogin />
            <LoginContent />
        </div>
    );
};
