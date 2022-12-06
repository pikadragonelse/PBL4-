import React from 'react';
import { Search } from '../../search';

import './friend-box-header.css';

export const FriendBoxHeader = () => {
    return (
        <div className="friend-box-header">
            <div className="friend-box-header-type">
                <div className="friend-box-header-type-item friend-box-header-general select-type-friend-box">
                    General
                </div>
                <div className="friend-box-header-type-item friend-box-header-group">Groups</div>
            </div>

            <div className="friend-box-header-search-container">
                <Search />
            </div>
        </div>
    );
};
