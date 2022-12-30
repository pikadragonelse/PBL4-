import { useNavigate } from 'react-router';
import React, { useState } from 'react';

import './login-content.css';
import { FormLogin } from '../../form-login';
import { FormSignIn } from '../../form-sign-in/form-sign-in';
import { Modal } from '../../modal';
import { FormNoti } from '../../form-noti';
import { api } from '../../../api';

export const LoginContent = () => {
    const navigate = useNavigate();
    const [isHiddenLoginForm, setIsHiddenLoginForm] = useState(false);
    const [isHiddenSignInForm, setIsHiddenSignInForm] = useState(true);
    const [errorState, setErrorState] = useState(false);
    const [successState, setSuccessState] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenErrorLogin, setIsOpenErrorLogin] = useState(false);

    const loginHandle = (event, form) => {
        event.preventDefault();
        const dataLogin = {
            username: form.elements.username.value,
            password: form.elements.password.value,
        };

        fetch(`${api}/authenticate`, {
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
                } else {
                    setIsOpenErrorLogin(true);
                }
            })
            .catch(() => {
                setIsOpenErrorLogin(true);
            });
    };

    const signInHandle = (event, form) => {
        event.preventDefault();
        if (errorState === false) {
            let gender;

            form.elements.GenderRadio.forEach((item) => {
                if (item.checked === true) {
                    gender = item.value;
                }
            });

            const dataSignIn = {
                username: form.elements.Username.value,
                password: form.elements.Password.value,
                email: form.elements.Email.value,
                name: form.elements.Nickname.value,
                dateOfBirth: form.elements.DateOfBirth.value,
                gender: gender,
            };

            fetch(`${api}/api/user/create-new-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataSignIn),
            })
                .then(() => setSuccessState(true))
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleShowSignInForm = () => {
        setIsHiddenLoginForm(true);
        setIsHiddenSignInForm(false);
    };

    const handleHideSignInForm = () => {
        setIsHiddenLoginForm(false);
        setIsHiddenSignInForm(true);
        setSuccessState(false);
        setErrorState(false);
        setIsOpenModal(false);
    };

    return (
        <div className="login-content">
            <Modal
                content={
                    <FormNoti
                        content={
                            successState === true
                                ? 'Successful!'
                                : errorState === true
                                ? 'Something wrongs, please check your information!'
                                : ''
                        }
                        setIsOpenModal={errorState === true ? setIsOpenModal : handleHideSignInForm}
                    />
                }
                title={successState === true ? 'Successful' : errorState === true ? 'Error' : ''}
                type="notification"
                isOpenModalRequest={isOpenModal}
                setIsOpenModalRequest={setIsOpenModal}
            />

            <Modal
                content={
                    <FormNoti
                        content={'Incorrect username or password, please check again!'}
                        setIsOpenModal={setIsOpenErrorLogin}
                    />
                }
                title="Error"
                type="notification"
                isOpenModalRequest={isOpenErrorLogin}
                setIsOpenModalRequest={setIsOpenErrorLogin}
            />

            <FormLogin
                isHidden={isHiddenLoginForm}
                loginHandle={loginHandle}
                handleShowSignInForm={handleShowSignInForm}
                setIsOpenErrorLogin={setIsOpenErrorLogin}
            />

            <div className={`login-image-container ${isHiddenSignInForm === false ? 'show-sign-in-form' : ''}`}>
                <img className="login-image" alt="app" src={`${process.env.PUBLIC_URL}/app-image.png`} />
            </div>

            <FormSignIn
                isHidden={isHiddenSignInForm}
                handleHideSignInForm={handleHideSignInForm}
                signInHandle={signInHandle}
                setErrorState={setErrorState}
                setIsOpenModal={setIsOpenModal}
            />
        </div>
    );
};
