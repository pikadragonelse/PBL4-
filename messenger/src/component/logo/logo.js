import { faVolcano } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './logo.css';

export const Logo = ({ type }) => {
    return (
        <div className="logo-app">
            <FontAwesomeIcon className={`${type}-icon`} icon={faVolcano} />
            {type === 'logo-app' ? (
                <span className={`${type}-name`}>EME {/*- Emotional Experience Messages*/}</span>
            ) : (
                ''
            )}
        </div>
    );
};
