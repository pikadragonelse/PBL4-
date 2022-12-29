import React from 'react';
import ReactDOM from 'react-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Search } from '../search';

import './modal.css';
import { Button } from '../button';
import { useState } from 'react';

export const Modal = ({
    content,
    type,
    isOpenModalRequest,
    setIsOpenModalRequest,
    title,
    setSearchTxt,
    setIsSearch,
}) => {
    const [inputRef, setInputRef] = useState(null);

    return ReactDOM.createPortal(
        <div className={`modal-wrapper ${isOpenModalRequest === true ? 'modal-open' : ''}`}>
            <div className="overlay-modal"></div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="form"
            >
                <div className="form-header">
                    <h2 className="form-title">{title}</h2>
                    {type === 'add-friend' ? (
                        <div className="form-add-friend-search-container">
                            <Search setInputRef={setInputRef} className="form-add-friend-search" />
                            <Button
                                onClick={() => {
                                    setSearchTxt(inputRef.value);
                                    setIsSearch(true);
                                }}
                                primary
                                size="small"
                            >
                                Search
                            </Button>
                        </div>
                    ) : (
                        ''
                    )}
                    <FontAwesomeIcon
                        onClick={() => setIsOpenModalRequest(false)}
                        icon={faTimes}
                        className="form-close-icon"
                    />
                </div>
                {content}
            </form>
        </div>,
        document.querySelector('body'),
    );
};
