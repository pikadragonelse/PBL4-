import React from 'react';
import { ListMessageItem } from './list-message-item';

import './list-message.css';

export const ListMessage = ({ listGroup, sendToBroker }) => {
    return (
        <ul className="list-message">
            {listGroup.map((group) => (
                <ListMessageItem
                    sendToBroker={sendToBroker}
                    key={group.time}
                    idGroup={group.idGroup}
                    nameSender={group.nameSender}
                    lastMessage={group.message}
                    timeMessage={group.time}
                />
            ))}
        </ul>
    );
};
