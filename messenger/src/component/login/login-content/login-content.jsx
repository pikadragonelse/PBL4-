import { useNavigate } from 'react-router';
import React, {useState} from 'react';

import './login-content.css';
import { FormLogin } from '../../form-login';
import { FormSignIn } from '../../form-sign-in/form-sign-in';

export const LoginContent = () => {
    const navigate = useNavigate();
    const [isHiddenLoginForm, setIsHiddenLoginForm] = useState(false);
    const [isHiddenSignInForm, setIsHiddenSignInForm] = useState(true);


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

    const signInHandle = (event, form) => {
        event.preventDefault();
        const dataSignIn = {
            username: form.elements.username.value,
            password: form.elements.password.value,
        };

        fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataSignIn),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== 401) {
                    navigate(`/messenger-page/${data.id}`, { state: data });
                    setIsHiddenLoginForm(false);
                    setIsHiddenSignInForm(true);
                }
            });
    };

    const handleShowSignInForm = () => {
        setIsHiddenLoginForm(true);
        setIsHiddenSignInForm(false);
    }

    const handleHideSignInForm = () => {
        setIsHiddenLoginForm(false);
        setIsHiddenSignInForm(true);
    }

    return (
        <div className="login-content">

            <FormLogin isHidden={isHiddenLoginForm} loginHandle={loginHandle} handleShowSignInForm={handleShowSignInForm}/>


            <div className={`login-image-container ${isHiddenSignInForm === false ? 'show-sign-in-form' : ''}`}>
                <img className="login-image" alt="app" src={`${process.env.PUBLIC_URL}/app-image.png`} />
            </div>

            <FormSignIn isHidden={isHiddenSignInForm} handleHideSignInForm={handleHideSignInForm} signInHandle={signInHandle}/>
        </div>
    );
};
