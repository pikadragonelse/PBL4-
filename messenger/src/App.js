import React, { useEffect } from 'react';

import './App.css';
import { DetailInfoInbox } from './component/detail-info-inbox';
import { FriendBox } from './component/friend-box';
import { Inbox } from './component/inbox';
import { Sidebar } from './component/sidebar';
import { Wrapper } from './component/wrapper';

const App = () => {
    return (
        <Wrapper type="wrapper-app">
            <Sidebar />
            <FriendBox />
            <Inbox idUser="" />
            <DetailInfoInbox />
        </Wrapper>
    );
};

export default App;
