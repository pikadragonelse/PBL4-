import React from 'react';

import { Avatar } from '../../../avatar';
import './list-message-item.css';

export const ListMessageItem = ({ nameSender, lastMessage, timeMessage, idGroup, sendToBroker }) => {
    return (
        <li
            onClick={() => {
                sendToBroker('default', idGroup);
            }}
            className="list-message-friend-message"
        >
            <div className="list-message-friend-avt-container">
                <Avatar src={process.env.PUBLIC_URL + '/avatar.jpg'} />
            </div>
            <div className="list-message-friend-info">
                <h4 className="list-message-friend-nickname">{nameSender}</h4>
                <p className="list-message-friend-content">{lastMessage}</p>
            </div>
            <p className="list-message-message-time">{timeMessage}</p>
        </li>
    );
};
