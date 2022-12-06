import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import './feature.css';

export const Feature = ({ content }) => {
    return (
        <div className="detail-info-inbox-feature">
            <p className="detail-info-inbox-feature-content">{content}</p>
            <FontAwesomeIcon className="detail-info-inbox-feature-icon" icon={faAngleRight} />
        </div>
    );
};
