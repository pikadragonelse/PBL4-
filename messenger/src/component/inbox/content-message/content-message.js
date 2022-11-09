import React, { useEffect, useRef, useState } from 'react';

import './content-message.css';
import { Message } from './message';

const ContentMessage = ({ idUser, messageSended }) => {
    const [listMessage, setListMessage] = useState({});
    let checkSendMessage = useRef(false);
    const getAllMessages = () => {
        fetch('http://localhost:8080/api/message/get-message/?idGroup=1&page=0')
            .then((res) => res.json())
            .then((data) => setListMessage(data));
    };

    const sendMessage = (messageSended) => {
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageSended),
        };

        fetch('http://localhost:8080/api/message/get-message/?idGroup=1&page=0', option);
    };
    useEffect(() => {
        getAllMessages();
    }, [listMessage]);

    useEffect(() => {
        sendMessage(messageSended);
    }, [checkSendMessage.current]);

    return (
        <div className="content-message">
            {listMessage.map((item, index) => (
                <Message
                    key={index}
                    type={item.idSender === 1 ? 'user-message' : ''}
                    image="https://www.mordeo.org/files/uploads/2019/04/Spitz-Pet-Dog-4K-Ultra-HD-Mobile-Wallpaper-950x1689.jpg"
                >
                    {item.message}
                </Message>
            ))}
        </div>
    );
};

export { ContentMessage };
