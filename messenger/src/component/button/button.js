import React from 'react';

import './button.css';

export const Button = ({ href, children, primary }) => {
    return href != null && href !== '' ? (
        <a href={href} className="button-app">
            {children}
        </a>
    ) : (
        <button className={`button-app ${primary === true ? 'button-primary' : ''}`}>{children}</button>
    );
};
