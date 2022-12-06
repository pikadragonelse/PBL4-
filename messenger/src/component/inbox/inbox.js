import React, { useState } from 'react';
import { ContentMessage } from './content-message';
import { HeaderInbox } from './header-inbox';

import './inbox.css';
import { MessageBox } from './message-box';

const Inbox = ({ idUser }) => {
    const [message, setMessage] = useState({});

    const handleSendMessage = (message) => {
        setMessage(message);
    };

    return (
        <div className="inbox-main">
            <HeaderInbox />
            <ContentMessage idUser={idUser} />
            <MessageBox handleSendMessage={handleSendMessage} />
        </div>
    );
};

export { Inbox };
