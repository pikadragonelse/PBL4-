import React from 'react';
import { ListMessageItem } from './list-message-item';

import './list-message.css';

export const ListMessage = ({ listGroup, sendToBroker }) => {
    const [idGroupActive, setIdGroupActive] = React.useState(undefined);

    React.useEffect(() => {
        try {
            setIdGroupActive(listGroup[0].idGroup);
        } catch (Error) {}
    }, [listGroup]);

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
                    setIdGroupActive={setIdGroupActive}
                    isActive={`${
                        idGroupActive != null && idGroupActive === group.idGroup
                            ? 'list-message-friend-message-active'
                            : ''
                    }`}
                />
            ))}
        </ul>
    );
};
