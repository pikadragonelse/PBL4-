import React from 'react';
import { HeaderLogin } from './header-login/header-login';
import { LoginContent } from './login-content';

import './login.css';
export const Login = () => {
    return (
        <div className="login-container">
            <HeaderLogin />
            <LoginContent />
        </div>
    );
};
