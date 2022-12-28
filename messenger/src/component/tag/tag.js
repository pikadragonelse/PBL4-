import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './tag.css';

export const Tag = ({ children, onClick, type }) => {
    return (
        <div className={`tag ${type}`}>
            <p className="tag-content">{children}</p>
            {type !== 'favoriteTag' ? <FontAwesomeIcon onClick={onClick} icon={faTimes} className="tag-icon" /> : ''}
        </div>
    );
};
