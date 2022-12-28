import { Search } from '../../search';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

import './friend-box-header.css';

export const FriendBoxHeader = ({ setStateFriendBox, setIsOpenModalAddFriendToGroup }) => {
    const [stateHeaderFriendBox, setStateHeaderFriendBox] = useState('general');

    return (
        <div className="friend-box-header">
            <div className="friend-box-header-type">
                <div
                    onClick={() => {
                        setStateFriendBox('general');
                        setStateHeaderFriendBox('general');
                    }}
                    className={`friend-box-header-type-item friend-box-header-general ${
                        stateHeaderFriendBox === 'general' ? 'select-type-friend-box' : ''
                    }`}
                >
                    General
                </div>
                <div
                    onClick={() => {
                        setStateFriendBox('groups');
                        setStateHeaderFriendBox('groups');
                    }}
                    className={`friend-box-header-type-item friend-box-header-group ${
                        stateHeaderFriendBox === 'groups' ? 'select-type-friend-box' : ''
                    } `}
                >
                    Groups
                </div>
            </div>

            <div className="friend-box-header-search-container">
                <Search />
            </div>
            <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={() => setIsOpenModalAddFriendToGroup(true)}
                className={`friend-box-icon-edit-group ${stateHeaderFriendBox === 'groups' ? 'show-icon-edit' : ''}`}
            />
        </div>
    );
};
