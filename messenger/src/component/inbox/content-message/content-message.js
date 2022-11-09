import React, { useEffect, useState } from 'react';

import './content-message.css';
import { Message } from './message';

const ContentMessage = ({ idUser }) => {
    const [listMessage, setListMessage] = useState({});

    // useEffect(() => {
    //     fetch('http://localhost:3001/content')
    //         .then((res) => res.json())
    //         .then((data) => setListMessage(data));
    // }, []);
    useEffect(() => {
        fetch('http://localhost:8080/api/message/get-message/?idGroup=1&page=0')
            .then((res) => res.json())
            .then((data) => setListMessage(data));
    }, []);

    console.log(listMessage.content);

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
