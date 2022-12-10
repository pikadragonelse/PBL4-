
import React from 'react';
import './wrapper.css';

const Wrapper = ({ children, type }) => {
    return <div className={type}>{children}</div>;
};

export { Wrapper };
