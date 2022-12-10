import React from 'react';

import './input.css';

export const Input = ({ type, placeholder, name, id }) => {
    return <input id={id} name={name} type={type} className={`input-app ${ type === 'file' || type === 'radio'? 'input-none-decor' : ''}`} placeholder={ type === 'file' || type === 'radio' ? '' : placeholder }/>;
};
