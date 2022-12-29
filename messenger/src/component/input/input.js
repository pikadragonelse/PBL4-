import React from 'react';

import './input.css';

const specialClassList = {
    file: 'input-none-decor',
    radio: 'input-none-decor',
};

export const Input = ({ type, placeholder, name, id, value, onBlur, errorState, onClick }) => {
    return (
        <input
            id={id}
            name={name}
            value={value}
            type={type}
            className={`input-app ${specialClassList[type]} ${errorState}`}
            placeholder={type === 'file' || type === 'radio' ? '' : placeholder}
            onBlur={onBlur}
            onClick={onClick}
        />
    );
};
