import React from 'react';
import { ContentMessage } from './content-message';
import { HeaderInbox } from './header-inbox';

import './inbox.css';
import { MessageBox } from './message-box';

const Inbox = ({ idUser }) => {
    return (
        <div className="inbox-main">
            <HeaderInbox />
            <ContentMessage idUser={idUser} />
            <MessageBox />
        </div>
    );
};

export { Inbox };
