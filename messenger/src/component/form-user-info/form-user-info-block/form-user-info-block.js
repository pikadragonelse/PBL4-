import React from 'react';

import './form-user-info-block.css';

export const FormUserInfoBlock = ({ children, title }) => {
    return (
        <div className="form-user-info-block">
            <h2 className="form-user-info-block-title">{title}</h2>
            <ul className="form-user-info-block-content">{children}</ul>
        </div>
    );
};
