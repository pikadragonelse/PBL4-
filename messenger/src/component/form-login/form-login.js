import React from 'react'
import { Button } from '../button';
import { Input } from '../input';

import './form-login.css';

export const FormLogin = ({loginHandle, isHidden, handleShowSignInForm}) => {
  return (
    <form
        onSubmit={(e) => {
            const form = e.target;
            loginHandle(e, form);
        }}
        className={`login-form ${isHidden === true ? 'hidden' : ''}`}
    >
        <h1 className="login-title"> Emotional Experience Messages</h1>
        <div className="login-info">
            <Input name="username" type="text" placeholder="Username or phone number" />
            <Input name="password" type="password" placeholder="Password" />
        </div>
        <div className="login-feature">
            <Button primary type="submit">Log in</Button>

            <div onClick={handleShowSignInForm} className="sign-in-container">
                <Button type="button">Sign up</Button>
            </div>
        </div>
        <div className="login-forgot-pass">
            <a href="!#" className="login-forgot-pass-link">
                Forgot your password?
            </a>
        </div>
    </form>
  )
}
