import React from 'react'
import ReactDOM from 'react-dom'

import {FormSignIn} from '../form-sign-in'
import './modal.css'

export const Modal = ({children}) => {
    return ReactDOM.createPortal(
        <div className="modal-wrapper">
            <div className="overlay-modal"></div>
            <FormSignIn />
        </div>,
        document.querySelector('body'),
    )
}
