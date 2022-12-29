import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import './search.css';

export const Search = ({ className, setInputRef }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (typeof setInputRef !== 'undefined') {
            setInputRef(inputRef.current);
        }
    }, [inputRef.current]);

    return (
        <div className={`search ${className}`}>
            <div className="search-icon-container">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            <input ref={inputRef} className="search-input" placeholder="Search friend" />
        </div>
    );
};
