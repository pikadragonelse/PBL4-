import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../button/button';
import { Input } from '../../input';

import './login-content.css';

export const LoginContent = () => {
    const navigate = useNavigate();

    const loginHandle = (event, form) => {
        event.preventDefault();
        const dataLogin = {
            username: form.elements.username.value,
            password: form.elements.password.value,
        };

        fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataLogin),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== 401) {
                    navigate(`/messenger-page/${data.id}`, { state: data });
                }
            });
    };

    return (
        <div className="login-content">
            <form
                onSubmit={(e) => {
                    const form = e.target;
                    loginHandle(e, form);
                }}
                className="login-form"
            >
                <h1 className="login-title"> Emotional Experience Messages</h1>
                <div className="login-info">
                    <Input name="username" type="text" placeholder="Email address or phone number" />
                    <Input name="password" type="password" placeholder="Password" />
                </div>
                <div className="login-feature">
                    <Button primary>Log in</Button>
                    <Button>Sign up</Button>
                </div>
                <div className="login-forgot-pass">
                    <a href="!#" className="login-forgot-pass-link">
                        Forgot your password?
                    </a>
                </div>
            </form>
            <div className="login-image-container">
                <img className="login-image" alt="app" src={process.env.PUBLIC_URL + '/app-image.png'} />
            </div>
        </div>
    );
};
