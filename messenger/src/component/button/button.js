import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './button.css';

export const Button = ({ href, children, primary, type, onClick, size, className, typeDecor }) => {
    const sizeButton = {
        small: 'small',
        middle: 'medium',
        large: 'large',
    };

    const typeDecorButton = {
        primary: 'button-primary',
        cancel: 'button-cancel',
    };

    return href != null && href !== '' ? (
        <a href={href} className="button-app">
            {children}
        </a>
    ) : (
        <button
            type={type}
            onClick={onClick}
            className={`button-app ${primary === true ? 'button-primary' : ''} ${sizeButton[size]} ${className} ${
                typeDecorButton[typeDecor]
            }`}
        >
            <div className="button-content">{children}</div>
            <FontAwesomeIcon icon={faTimes} className="button-cancel-icon" />
        </button>
    );
};
