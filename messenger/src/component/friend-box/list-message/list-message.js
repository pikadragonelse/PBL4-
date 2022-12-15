import { ListMessageItem } from './list-message-item';
import React, { useRef } from 'react';


import './list-message.css';

export const ListMessage = ({ listGroup, sendToBroker }) => {
    const [idGroupActive, setIdGroupActive] = React.useState(undefined);
    const tempRef = useRef(0);

    React.useEffect(() => {
        try {
            if (tempRef.current === 0) {
                setIdGroupActive(listGroup[0].idGroup);
                sendToBroker("default", listGroup[0].idGroup);
                tempRef.current++;
            }
        } catch (Error) {
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
