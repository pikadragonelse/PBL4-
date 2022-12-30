import React, { useRef, useState } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import './form-sign-in.css';
import { api } from '../../api.js';

const subInputSections = ['Email', 'Nickname'];
const mainInputSections = ['Username', 'Password'];

export const FormSignIn = ({ isHidden, signInHandle, handleHideSignInForm, setErrorState, setIsOpenModal }) => {
    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorBirthDate, setErrorBirthDate] = useState('');
    const [errorGender, setErrorGender] = useState('');

    const formRef = useRef(null);

    const errorStateInput = {
        Username: errorUsername,
        Email: errorEmail,
        Password: errorPassword,
    };

    const validateUserName = (username) => {
        const re = /^\S*$/;
        if (username.length === 0) {
            setErrorUsername('Please enter username');
            setErrorState(true);
            return;
        }
        if (username.length <= 4) {
            setErrorUsername('Username is more than 4 characters');
            setErrorState(true);
            return;
        }
        if (re.test(username) === false) {
            setErrorUsername('Username cannot have special characters');
            setErrorState(true);
            return;
        }

        fetch(`${api}/api/user/check-valid-username?username=${username}`)
            .then((response) => (response.status !== 200 ? setErrorUsername('Username already used') : ''))
            .catch(() => {});

        setErrorUsername('');
        setErrorState(false);
    };

    const validateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
            setErrorEmail('You have entered an invalid email address!');
            setErrorState(true);
            return;
        }
        fetch(`${api}/api/user/check-valid-email?email=${email}`)
            .then((response) => (response.status !== 200 ? setErrorEmail('Email already used') : ''))
            .catch(() => {});

        setErrorEmail('');
        setErrorState(false);
    };

    const validatePassword = (password) => {
        if (password.length === 0) {
            setErrorPassword('Please enter password');
            setErrorState(true);
            return;
        }
        setErrorPassword('');
        setErrorState(false);
    };

    const validateBirthDate = (birthDate) => {
        if (birthDate.length === 0) {
            setErrorBirthDate('Please enter your birthday');
            setErrorState(true);
            return;
        }
        setErrorBirthDate('');
        setErrorState(false);
    };

    const validateGender = (gender) => {
        if (gender.value !== 'true' && gender.value !== 'false') {
            setErrorGender('Please check your gender');
            setErrorState(true);
            return;
        }
        setErrorGender('');
        setErrorState(false);
    };

    return (
        <form
            ref={formRef}
            onSubmit={(e) => {
                const form = e.target;
                signInHandle(e, form);
            }}
            className={`form-sign-in-container ${isHidden === true ? 'hidden' : ''}`}
        >
            <div className="form-sign-in-header">
                <h2 className="form-sign-in-title">Sign in</h2>
            </div>

            <div className="form-sign-in-body">
                <div className="form-sign-in-main-info">
                    {mainInputSections.map((item) => (
                        <div key={item} className="input-container">
                            <h3 className="input-title">{item}</h3>
                            <Input
                                onBlur={(e) => {
                                    item === 'Username'
                                        ? validateUserName(e.target.value)
                                        : validatePassword(e.target.value);
                                }}
                                type={item === 'Password' ? 'password' : ' text'}
                                name={item}
                                placeholder={item}
                                errorState={
                                    errorStateInput[item] !== '' && errorStateInput[item] != null ? 'error-input' : ''
                                }
                            />
                            <span className="input-validate">
                                {item === 'Username' ? errorUsername : errorPassword}{' '}
                            </span>
                        </div>
                    ))}
                </div>

                {subInputSections.map((item) => (
                    <div key={item} className="input-container">
                        <h3 className="input-title">{item}</h3>
                        <Input
                            onBlur={item === 'Email' ? (e) => validateEmail(e.target.value) : () => {}}
                            type="text"
                            name={item}
                            placeholder={item}
                            errorState={
                                errorStateInput[item] !== '' && errorStateInput[item] != null ? 'error-input' : ''
                            }
                        />
                        <span className="input-validate">{item === 'Email' ? errorEmail : ''}</span>
                    </div>
                ))}

                <div className="special-input">
                    <div className="input-container input-date-container">
                        <h3 className="input-title">Birthday</h3>
                        <Input
                            onBlur={(e) => validateBirthDate(e.target.value)}
                            type="date"
                            id="input-date"
                            name="DateOfBirth"
                            errorState={errorBirthDate !== '' ? 'error-input' : ''}
                        />
                        <span className="input-validate">{errorBirthDate}</span>
                    </div>
                    <div className="input-container">
                        <h3 className="input-title">Gender</h3>
                        <div className="info-gender-container">
                            <div className="info-gender">
                                <Input
                                    onClick={(e) => {
                                        const radio = e.target;
                                        validateGender(radio);
                                    }}
                                    type="radio"
                                    value={true}
                                    id="radio-male"
                                    name="GenderRadio"
                                />
                                <label htmlFor="radio-male">Male</label>
                            </div>

                            <div className="info-gender">
                                <Input
                                    onClick={(e) => {
                                        const radio = e.target;
                                        validateGender(radio);
                                    }}
                                    type="radio"
                                    value={false}
                                    id="radio-female"
                                    name="GenderRadio"
                                />
                                <label htmlFor="radio-female">Female</label>
                            </div>
                            <span className="input-validate">{errorGender}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-sign-in-footer">
                <div
                    onClick={() => {
                        setErrorUsername('');
                        setErrorEmail('');
                        setErrorBirthDate('');
                        setErrorGender('');
                        setErrorPassword('');
                        setErrorState(false);
                        handleHideSignInForm();
                    }}
                    className="form-sign-in-back-button-container"
                >
                    <Button type="button">Back</Button>
                </div>
                <Button
                    type="submit"
                    onClick={() => {
                        validateGender(formRef.current.GenderRadio);
                        validateUserName(formRef.current.Username.value);
                        validatePassword(formRef.current.Password.value);
                        validateBirthDate(formRef.current.DateOfBirth.value);
                        validateEmail(formRef.current.Email.value);
                        setIsOpenModal(true);
                    }}
                    primary
                >
                    Sign in
                </Button>
            </div>
        </form>
    );
};
