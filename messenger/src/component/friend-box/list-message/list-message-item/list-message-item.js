import React from 'react';

import { Avatar } from '../../../avatar';
import './list-message-item.css';

export const ListMessageItem = () => {
    return (
        <li className="list-message-friend-message">
            <div className="list-message-friend-avt-container">
                <Avatar src={process.env.PUBLIC_URL + '/avatar.jpg'} />
            </div>
            <div className="list-message-friend-info">
                <h4 className="list-message-friend-nickname">Long</h4>
                <p className="list-message-friend-content">Hom nay code do an nhaa</p>
            </div>
            <p className="list-message-message-time">17:05pm</p>
        </li>
    );
};
