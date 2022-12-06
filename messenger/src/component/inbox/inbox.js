import React, { useState, useEffect, useRef } from 'react';
import { ContentMessage } from './content-message';
import { HeaderInbox } from './header-inbox';

import './inbox.css';
import { MessageBox } from './message-box';

export const Inbox = ({ user }) => {
    const [listMessage, setListMessage] = useState([]);
    const [checkSendMessage, setCheckSendMessage] = useState(0);

    const inputRefParent = useRef(null);
    const contentMessageRefParent = useRef(null);

    const getAllMessages = () => {
        fetch(`http://localhost:8080/api/message/get-message?idGroup=1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: user.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setListMessage(data);
            })
            .catch((error) => console.log(error));
    };

    const sendMessage = (messageSended) => {
        fetch(`http://localhost:8080/api/message/send-message?idGroup=1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: user.token,
            },
            body: JSON.stringify(messageSended),
        })
            .then(() => {
                setCheckSendMessage((prev) => (prev = ++prev));
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllMessages();
        const timer = setTimeout(() => {
            contentMessageRefParent.current.setScroll();
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, [checkSendMessage]);

    useEffect(() => {
        const timer = setInterval(() => {
            getAllMessages();
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    });

    const handleSendMessage = (message) => {
        console.log(message.idSender);
        if (message.message !== '') {
            sendMessage(message);
            inputRefParent.current.reset();
        }
    };

    return (
        <div
            onKeyDown={(event) => {
                if (event.keyCode === 13) {
                    let message = {
                        idSender: user.id,
                        message: event.target.value,
                        text: true,
                    };
                    handleSendMessage(message);
                }
            }}
            className="inbox-main"
        >
            <HeaderInbox />
            <ContentMessage ref={contentMessageRefParent} idUser={user.id} listMessage={listMessage} />
            <MessageBox ref={inputRefParent} handleSendMessage={handleSendMessage} idUser={user.id} />
        </div>
    );
};
