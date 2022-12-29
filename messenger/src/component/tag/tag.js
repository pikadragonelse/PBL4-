import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './tag.css';

export const Tag = ({ children, onClick, type, addToListFavoriteUser, removeFromListFavorite }) => {
    return (
        <div
            onClick={() => {
                if (type === 'choiceFavoriteTag') {
                    addToListFavoriteUser(children);
                }
            }}
            className={`tag ${type}`}
        >
            <p className="tag-content">{children}</p>
            {type !== 'favoriteTag' && type !== 'choiceFavoriteTag' ? (
                <FontAwesomeIcon
                    onClick={() => {
                        onClick || removeFromListFavorite(children);
                    }}
                    icon={faTimes}
                    className="tag-icon"
                />
            ) : (
                ''
            )}
        </div>
    );
};
