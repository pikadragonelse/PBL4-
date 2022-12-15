import { Login } from '../../component/login';
import { Wrapper } from '../../component/wrapper';
import React from 'react';
import './login-page.css';

export const LoginPage = () => {
    return (
        <Wrapper type="wrapper-app">
            <Login />
        </Wrapper>
    );
};
