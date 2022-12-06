import React from 'react';

import './avatar.css';

export const Avatar = ({ src }) => {
    return <img className="avatar" src={src} alt="avatar" />;
};
