import { ListMessageItem } from './list-message-item';
import React, { useRef } from 'react';

import './list-message.css';

export const ListMessage = ({ listGroup, sendToBroker }) => {
    const [idGroupActive, setIdGroupActive] = React.useState(undefined);
    const [lastMessage, setLastMessage] = React.useState('');
    const [hasUnreadMessage, setHasUnreadMessage] = React.useState(false);
    const tempRef = useRef(0);

    React.useEffect(() => {
        try {
            if (tempRef.current === 0) {
                setIdGroupActive(listGroup[0].idGroup);
                sendToBroker('default', { idGroup: listGroup[0].idGroup, lastMessage: listGroup[0].message });
                sendToBroker('userInfoSub', { username: listGroup[0].groupName });
                sendToBroker('userInfoMain', { username: listGroup[0].groupName });
                tempRef.current++;
            }
            const groupActive = listGroup.filter((item) => item.idGroup === idGroupActive);
            if (lastMessage !== groupActive[0].message) {
                setLastMessage(groupActive[0].message);
                sendToBroker('default', { idGroup: idGroupActive, lastMessage: groupActive[0].message });
            }
        } catch (error) {
            console.log(error);
        }
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
                    typeMessage={group.type}
                    groupName={group.groupName}
                    setIdGroupActive={setIdGroupActive}
                    isActive={`${
                        idGroupActive != null && idGroupActive === group.idGroup
                            ? 'list-message-friend-message-active'
                            : ''
                    }`}
                    hasUnreadMessage={hasUnreadMessage}
                />
            ))}
        </ul>
    );
};
