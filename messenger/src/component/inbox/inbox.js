import React, { useState, useEffect, useRef } from 'react';
import { ContentMessage } from './content-message';
import { HeaderInbox } from './header-inbox';

import './inbox.css';
import { MessageBox } from './message-box';

export const Inbox = ({ user, useSubscribe }) => {
    const [listMessageOfGroup, setListMessageOfGroup] = useState([]);
    const [checkSendMessage, setCheckSendMessage] = useState(0);
    const [listGroup, setListGroup] = useState([]);
    const { idGroup, messageCount, unSubscribe } = useSubscribe('default');

    const inputRefParent = useRef(null);
    const contentMessageRefParent = useRef(null);

    const getAllGroup = async () => {
        await fetch(`http://localhost:8080/api/group/get-all-group?idUser=${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setListGroup(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getAllGroup();
    console.log(listGroup);

    const getAllMessages = () => {
        fetch(`http://localhost:8080/api/message/get-message?idGroup=${idGroup || listGroup[0].idGroup}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setListMessageOfGroup(data);
            })
            .catch((error) => console.log(error));
    };

    const sendMessage = (messageSended) => {
        fetch(`http://localhost:8080/api/message/send-message?idGroup=${idGroup || listGroup[0].idGroup}`, {
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

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         contentMessageRefParent.current.setScroll();
    //     }, 100);

    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, [checkSendMessage]);

    // useEffect(() => {
    //     // const timer = setInterval(() => {
    //     //     getAllMessages();
    //     // }, 1000);
    //     // return () => {
    //     //     clearInterval(timer);
    //     // };
    // });

    const handleSendMessage = (message) => {
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
            <ContentMessage ref={contentMessageRefParent} idUser={user.id} listMessage={listMessageOfGroup} />
            <MessageBox ref={inputRefParent} handleSendMessage={handleSendMessage} idUser={user.id} />
        </div>
    );
};
