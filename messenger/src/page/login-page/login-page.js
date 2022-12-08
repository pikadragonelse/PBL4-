import React from 'react';

import { Login } from '../../component/login';
import { Wrapper } from '../../component/wrapper';
import './login-page.css';

export const LoginPage = () => {
    return (
        <Wrapper type="wrapper-app">
            <Login />
        </Wrapper>
    );
};
