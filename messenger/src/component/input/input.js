import React from 'react';

import './input.css';

export const Input = ({ type, placeholder, name }) => {
    return <input name={name} type={type} className="input-app" placeholder={placeholder} />;
};
