import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ContentMessage } from './content-message';
import { HeaderInbox } from './header-inbox';

import './inbox.css';
import { MessageBox } from './message-box';

export const Inbox = ({ user, useSubscribe }) => {
    const [listMessageOfGroup, setListMessageOfGroup] = useState([]);
    const [checkSendMessage, setCheckSendMessage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { newestMessage } = useSubscribe('default');
    const [isDoneSend, setIsDoneSend] = useState(false);

    const contentMessageRefParent = useRef(null);

    const getAllMessages = () => {
        try {
            if (newestMessage.idGroup !== 0) {
                fetch(`http://localhost:8080/api/message/get-message?idGroup=${newestMessage.idGroup}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user.type} ${user.token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setIsLoading(false);
                        setListMessageOfGroup(data);
                    })
                    .catch((error) => console.log(error));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const sendMessage = (messageSended) => {
        try {
            if (newestMessage.idGroup !== 0) {
                fetch(`http://localhost:8080/api/message/send-message?idGroup=${newestMessage.idGroup}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user.type} ${user.token}`,
                    },
                    body: JSON.stringify(messageSended),
                })
                    .then(() => {
                        setIsDoneSend((prev) => (prev = !prev));
                        setCheckSendMessage((prev) => ++prev);
                    })
                    .catch((error) => console.log(error));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (newestMessage.idGroup !== 0) {
            setIsLoading(true);
            getAllMessages();
        }
        setIsLoading(true);
    }, [newestMessage.idGroup]);

    useEffect(() => {
        if (newestMessage.idGroup !== 0) {
            getAllMessages();
        }
    }, [newestMessage.lastMessage]);

    useEffect(() => {
        getAllMessages();
        contentMessageRefParent.current.setScroll();
    }, [checkSendMessage]);

    const handleSendMessage = (message) => {
        if (message.message !== '') {
            sendMessage(message);
        }
    };

    return (
        <div className="inbox-main">
            <HeaderInbox useSubscribe={useSubscribe} />
            <ContentMessage
                ref={contentMessageRefParent}
                isLoading={isLoading}
                idUser={user.id}
                listMessage={listMessageOfGroup}
            />
            <MessageBox isDoneSend={isDoneSend} handleSendMessage={handleSendMessage} />
        </div>
    );
};
