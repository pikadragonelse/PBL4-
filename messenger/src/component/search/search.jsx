import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './search.css';

export const Search = () => {
    return (
        <div className="search">
            <div className="search-icon-container">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            <input className="search-input" placeholder="Search friend" />
        </div>
    );
};
