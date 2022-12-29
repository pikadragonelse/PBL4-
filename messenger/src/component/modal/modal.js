import React from 'react';
import ReactDOM from 'react-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Search } from '../search';

import './modal.css';

export const Modal = ({ content, type, isOpenModalRequest, setIsOpenModalRequest, title }) => {
    const handleAddFriend = (e, form) => {
        e.preventDefault();
    };

    return ReactDOM.createPortal(
        <div className={`modal-wrapper ${isOpenModalRequest === true ? 'modal-open' : ''}`}>
            <div className="overlay-modal"></div>
            <form
                onSubmit={(e) => {
                    const target = e.target;
                    handleAddFriend(e, target);
                }}
                className="form"
            >
                <div className="form-header">
                    <h2 className="form-title">{title}</h2>
                    {type === 'add-friend' ? (
                        <div className="form-add-friend-search-container">
                            <Search className="form-add-friend-search" />
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
