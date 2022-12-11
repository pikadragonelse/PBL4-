import React from 'react'
import { Button } from '../button'
import { Input } from '../input'
import './form-sign-in.css'

const subInputSections = ['Phone number', 'Nickname']
const mainInputSections = ['Username', 'Password']

export const FormSignIn = ({ isHidden, signInHandle, handleHideSignInForm }) => {
  return (
    <form
      onSubmit={(e) => {
        const form = e.target
        signInHandle(e, form)
      }}
      className={`form-sign-in-container ${isHidden === true ? 'hidden' : ''}`}
    >
      <div className="form-sign-in-header">
        <h2 className="form-sign-in-title">Sign in</h2>
      </div>

      <div className="form-sign-in-body">


        <div className="form-sign-in-main-info">
          {mainInputSections.map(item => (
            <div key={item} className="input-container">
              <h3 className="input-title">{item}</h3>
              <Input
                type={item === 'password' ? 'password' : ' text'}
                placeholder={item}
              />
          </div>
          ))}
        </div>

        {subInputSections.map((item) => 
          <div key={item} className="input-container">
            <h3 className="input-title">{item}</h3>
            <Input
              type='text'
              placeholder={item}
            />
          </div>
        )}

        <div className="special-input">
          <div  className="input-container input-date-container">
              <h3 className="input-title">Birthday</h3>
              <Input type='date' id="input-date"/>
          </div>
          <div  className="input-container">
              <h3 className="input-title">Gender</h3>
              <div className="info-gender-container">
                <div className="info-gender">
                  <Input
                    type='radio'
                    value="male"
                    id="radio-male"
                    name="gender-radio"
                  />
                  <label for="radio-male">Male</label>
                </div>

                <div className="info-gender">
                  <Input
                    type='radio'
                    value="female"
                    id="radio-female"
                    name="gender-radio"
                  />
                  <label for="radio-female">Female</label>
                </div>
              </div>
              

          </div>
        </div>


      </div>

      <div className="form-sign-in-footer">
        <div onClick={handleHideSignInForm} className="form-sign-in-back-button-container">
          <Button type="button">Back</Button> 
        </div>
        <Button type="submit" primary>
          Sign in
        </Button>
      </div>
    </form>
  )
}
